import React, {
  Component,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    height: 40,
    backgroundColor: 'red',
  },
});
const InputText = forwardRef(function MyInput(props, ref) {
  const customRef = useRef(null);
  const [va, setValue] = useState('678');
  useImperativeHandle(
    ref,
    () => {
      return {
        value() {
          console.log('you are here', va);
          return va;
        },
        focus() {
          console.log('you are here');
          customRef.current.focus();
        },
        blur() {
          customRef.current.blur();
        },
      };
    },
    [va],
  );
  const onChangeText = text => {
    setValue(text);
  };
  return (
    <TextInput
      ref={customRef}
      onChangeText={onChangeText}
      style={styles.content}
    />
  );
});
export default InputText;
