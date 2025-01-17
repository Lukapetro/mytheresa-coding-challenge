export const theme = {
  colors: {
    primary: '#2196F3',
    background: '#FFFFFF',
    text: '#000000',
    card: '#FFFFFF',
    error: '#FF0000',
    textSecondary: '#666666',
    white: '#FFFFFF',
  },
  typography: {
    header: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
    },
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 24,
  },
};

export type Theme = typeof theme;
