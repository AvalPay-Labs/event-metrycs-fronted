/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      // Background colors - Dark theme based on slate palette
      background: "#020617",       // slate-950 - Main background
      card: "#0f172a",             // slate-900 - Card backgrounds
      element: "#1e293b",          // slate-800 - Element backgrounds
      input: "#334155",            // slate-700 - Input backgrounds
      
      // Text colors
      text: "#f8fafc",             // slate-50 - Primary text
      textSecondary: "#cbd5e1",    // slate-300 - Secondary text
      textMuted: "#64748b",        // slate-500 - Muted text
      
      // Primary brand colors - Blue palette
      primary: "#2563eb",          // blue-600 - Primary brand color
      primaryHover: "#1d4ed8",     // blue-700 - Primary hover
      primaryLight: "#3b82f6",     // blue-500 - Primary light variant
      
      // Secondary colors
      secondary: "#7c3aed",        // violet-600 - Secondary brand color
      secondaryHover: "#6d28d9",   // violet-700 - Secondary hover
      
      // Accent colors
      accent: "#059669",           // emerald-600 - Success/accent
      accentHover: "#047857",      // emerald-700 - Accent hover
      
      // Status colors
      success: "#10b981",          // emerald-500 - Success
      error: "#ef4444",            // red-500 - Error
      warning: "#f59e0b",          // amber-500 - Warning
      info: "#3b82f6",            // blue-500 - Info
      
      // Additional slate variants for depth
      slate50: "#f8fafc",
      slate100: "#f1f5f9",
      slate200: "#e2e8f0",
      slate300: "#cbd5e1",
      slate400: "#94a3b8",
      slate500: "#64748b",
      slate600: "#475569",
      slate700: "#334155",
      slate800: "#1e293b",
      slate900: "#0f172a",
      slate950: "#020617",
      
      // Blue variants
      blue50: "#eff6ff",
      blue100: "#dbeafe",
      blue200: "#bfdbfe",
      blue300: "#93c5fd",
      blue400: "#60a5fa",
      blue500: "#3b82f6",
      blue600: "#2563eb",
      blue700: "#1d4ed8",
      blue800: "#1e40af",
      blue900: "#1e3a8a",
      blue950: "#172554",
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        // Custom shadows for dark theme
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
    },
  },
  plugins: [],
};