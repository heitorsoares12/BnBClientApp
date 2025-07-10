import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SPACING } from '../styles/theme';

interface Props {
  value: string;
  onChange(value: string): void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <TextInput
      placeholder="Buscar..."
      value={value}
      onChangeText={onChange}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: SPACING,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
