import Ionicons from '@expo/vector-icons/Ionicons';

import React from 'react';
import { Pressable, Text, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';


type FontAwesomeIconName = React.ComponentProps<typeof Ionicons>['name'];


interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
  iconName?: FontAwesomeIconName;
  iconSize?: number;
  iconColor?: string;
  textStyle?: TextStyle;
}

const RoundedButton: React.FC<ButtonProps> = ({ 
  onPress, 
  title, 
  className, 
  textClassName, 
  iconName,
  iconSize = 24,
  iconColor = 'white', 
  style, 
  textStyle, 
  ...props 
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`items-center justify-center  ${className}`}
      style={style}
      {...props}
    >
        {iconName  &&  <Ionicons  name={iconName || 'ios-add-circle'} size={iconSize} color={iconColor} /> }
        {/* {iconName && <Text>Black</Text>} */}
      {title && <Text className={`font-bold ${textClassName}`} style={textStyle}>{title}</Text>}
    </Pressable>
  );
};

export default RoundedButton;