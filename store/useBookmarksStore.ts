import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParsedJobData } from '@/api/types';
import { useState, useEffect } from 'react';

interface BookmarkState {
  bookmarkedJobs: Record<string, ParsedJobData>;
  addBookmark: (job: ParsedJobData) => void;
  removeBookmark: (jobId: string) => void;
  clearAllBookmarks: () => void;
  isBookmarked: (jobId: string) => boolean;
  _hasHydrated: boolean;
  _setHasHydrated: (state: boolean) => void;
}

export const useBookmarksStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarkedJobs: {},
      
      _hasHydrated: false,
      _setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        });
      },
      
      addBookmark: (job) => {
        if (job.id === undefined) return;
        
        const jobId = job.id.toString();
        set((state) => ({
          bookmarkedJobs: { ...state.bookmarkedJobs, [jobId]: job }
        }));
      },
      
      removeBookmark: (jobId) => set((state) => {
        const newBookmarks = { ...state.bookmarkedJobs };
        delete newBookmarks[jobId];
        return { bookmarkedJobs: newBookmarks };
      }),
      
      clearAllBookmarks: () => set({ bookmarkedJobs: {} }),
      
      isBookmarked: (jobId) => {
        return !!get().bookmarkedJobs[jobId];
      }
    }),
    {
      name: 'bookmarks-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ bookmarkedJobs: state.bookmarkedJobs }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._setHasHydrated(true);
        }
      },
    }
  )
);

export const useBookmarksHydration = () => {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    const unsubFinished = useBookmarksStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    
    if (useBookmarksStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    
    return () => {
      unsubFinished();
    };
  }, []);
  
  return hydrated;
}; 