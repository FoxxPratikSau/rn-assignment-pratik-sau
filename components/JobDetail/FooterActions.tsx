import React from 'react';
import { View } from 'react-native';
import FooterButton from '@/components/FooterButton';
import { Ionicons } from '@expo/vector-icons';

interface FooterActionsProps {
  onChat: () => void;
  onCall: () => void;
  colors: any;
  styles: any;
}

const FooterActions = ({ onChat, onCall, colors, styles }: FooterActionsProps) => (
  <View style={styles.footerRow}>
    <FooterButton
      icon={<Ionicons name="logo-whatsapp" size={18} color={colors.chatButtonText} />}
      text="Chat"
      onPress={onChat}
      style={{
        ...styles.chatButton,
        backgroundColor: colors.chatButtonBackground,
        borderColor: colors.chatButtonBorder
      }}
      textStyle={{ ...styles.chatText, color: colors.chatButtonText }}
      testID="footer-chat-btn"
    />
    <FooterButton
      icon={<Ionicons name="call" size={18} color={colors.callButtonText} />}
      text="Call"
      onPress={onCall}
      style={{
        ...styles.callButton,
        backgroundColor: colors.callButtonBackground
      }}
      textStyle={{ ...styles.callText, color: colors.callButtonText }}
      testID="footer-call-btn"
    />
  </View>
);

export default FooterActions; 