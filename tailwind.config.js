const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#094FC6',
          dark: '#0A3A8B',
        },
        // Couleurs communes
        error: colors.red[500],
        success: colors.green[500],
        warning: colors.orange[500],
        
        // Thème clair
        light: {
          background: '#FFFFFF',
          surface: '#F5F5F5',
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
          },
          divider: colors.gray[400],
          card: '#FFFFFF',
        },
        
        // Thème sombre
        dark: {
          background: '#121212',
          surface: '#1E1E1E',
          text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
          divider: 'rgba(255, 255, 255, 0.24)',
          card: '#2C2C2C',
        },
      },
    },
  },
  plugins: [],
}; 