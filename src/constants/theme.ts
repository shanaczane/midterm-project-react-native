export const lightTheme = {
  // Backgrounds
  background: '#FFFFFF',
  card: '#F8F8F8',
  
  // Text
  text: '#0A0A0A',
  textSecondary: '#555555',
  textTertiary: '#999999',
  
  // UI elements
  border: '#E0E0E0',
  primary: '#0A0A0A',
  success: '#2E7D32',
  error: '#C62828',
};

export const darkTheme = {
  // Backgrounds
  background: '#0A0A0A',
  card: '#1C1C1C',
  
  // Text
  text: '#F5F5F5',
  textSecondary: '#AAAAAA',
  textTertiary: '#666666',
  
  // UI elements
  border: '#333333',
  primary: '#F5F5F5',
  success: '#66BB6A',
  error: '#EF5350',
};

export type Theme = typeof lightTheme;