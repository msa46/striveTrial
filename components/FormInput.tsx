import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native';

interface FormInputProps extends UseControllerProps {
    label: string;
    placeholder?: string;
  }

  const FormInput = ({ name, control, rules, label, placeholder }: FormInputProps) => {
    const { field, fieldState } = useController({
      name,
      control,
      rules,
    });
  
    return (
      <View className='mb-5'>
        <Text className='mb-1 text-base' style={styles.label}>{label}</Text>
        <RNTextInput
          style={[styles.input, fieldState.error && styles.inputError]}
          className={`border rounded-md p-3 text-base 
            ${fieldState.error 
              ? 'border-red-500 text-red-500' 
              : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100'} 
            bg-white dark:bg-gray-800`}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          placeholder={placeholder}
          placeholderTextColor={fieldState.error? '#FCA5A5':'#9CA3AF'}
        />
        {fieldState.error && (
          <Text  className="text-red-500 text-sm mt-1" >{fieldState.error.message}</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },
  });
  
  export default FormInput;