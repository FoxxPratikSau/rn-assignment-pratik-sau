import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface FooterButtonProps {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

const FooterButton = ({ icon, text, onPress, style, textStyle, testID }: FooterButtonProps) => (
  <Pressable style={[styles.footerBtn, style]} onPress={onPress} testID={testID}>
    {icon}
    <Text style={[styles.footerBtnText, textStyle]}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  footerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    marginHorizontal: 5,
    borderWidth: 1.5,
  },
  footerBtnText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6,
  },
});

export default FooterButton; 