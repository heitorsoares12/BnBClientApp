import { ColorSchemeName } from 'react-native';
export const SPACING = 16;
interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  card: string;
  inactive: string;
  notification: string;
}

export const lightColors: ThemeColors = {
  background: '#ffffff',
  text: '#000000',
  primary: '#F79D41',
  secondary: '#00573F',
  border: '#dddddd',
  inactive: '#9e9e9e',
  card: '#ffffff',
  notification: '#dc3545',
};

export const darkColors: ThemeColors = {
  background: '#121212',
  text: '#ffffff',
  primary: '#64b5f6',
  secondary: '#9e9e9e',
  border: '#333333',
  inactive: '#757575',
  card: '#1e1e1e',
  notification: '#ef5350',
};

export const getColors = (scheme: ColorSchemeName): ThemeColors => {
  return scheme === 'dark' ? darkColors : lightColors;
};
