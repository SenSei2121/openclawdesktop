/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OpenClaw brand colors
        claw: {
          50: '#fef1f1',
          100: '#fde3e3',
          200: '#fccbcb',
          300: '#f9a3a3',
          400: '#e04444',
          500: '#e8272c',  // Primary color - matches website
          600: '#c11a1f',
          700: '#8e1a1d',
          800: '#721a1c',
          900: '#5a0f12',
          950: '#320709',
        },
        // Light theme backgrounds (warm-tinted to match website)
        dark: {
          900: '#fdfcfb',  // Body/main background
          800: '#f3f0ed',  // Sidebar, header backgrounds
          700: '#ffffff',  // Card backgrounds
          600: '#e6e2de',  // Borders, dividers
          500: '#cec8c2',  // Secondary borders
          400: '#a69e96',  // Muted elements
        },
        // Accent colors
        accent: {
          cyan: '#3b82f6',   // Blue (info)
          purple: '#7c3aed',
          green: '#10b981',  // Success green (matches website)
          amber: '#f59e0b',  // Warning amber (matches website)
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'Cascadia Code',
          'SF Mono',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(232, 39, 44, 0.15)' },
          '100%': { boxShadow: '0 0 20px rgba(232, 39, 44, 0.25)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-claw': '0 6px 20px rgba(232, 39, 44, 0.1)',
        'glow-cyan': '0 6px 20px rgba(59, 130, 246, 0.1)',
        'glow-green': '0 6px 20px rgba(16, 185, 129, 0.1)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
        'card': '0 1px 3px rgba(26, 22, 20, 0.06), 0 2px 8px rgba(26, 22, 20, 0.04)',
        'card-hover': '0 6px 20px rgba(26, 22, 20, 0.08), 0 2px 6px rgba(26, 22, 20, 0.04)',
        'card-lg': '0 12px 36px rgba(26, 22, 20, 0.08)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
