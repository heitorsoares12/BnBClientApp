import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS, SPACING} from '../styles/theme';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar = ({value, onChange}: Props) => (
  <View style={styles.container}>
    <TextInput
      placeholder="Buscar..."
      value={value}
      onChangeText={onChange}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: SPACING,
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: SPACING / 2,
  },
});

export default SearchBar;
