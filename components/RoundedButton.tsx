import Ionicons from '@expo/vector-icons/Ionicons';

import React from 'react';
import { Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';


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
  iconColor = 'black', 
  style, 
  textStyle, 
  ...props 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`items-center justify-center  ${className}`}
      style={style}
      {...props}
    >
        {iconName  &&  <Ionicons name={iconName || 'ios-add-circle'} size={iconSize} color={iconColor} /> }
      {title && <Text className={`font-bold ${textClassName}`} style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default RoundedButton;