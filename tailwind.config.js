/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gray-200 */
        input: "var(--color-input)", /* white */
        ring: "var(--color-ring)", /* deep-green-800 */
        background: "var(--color-background)", /* white */
        foreground: "var(--color-foreground)", /* gray-900 */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep-green-800 */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* harvest-gold */
          foreground: "var(--color-secondary-foreground)", /* gray-900 */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-600 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* gray-50 */
          foreground: "var(--color-muted-foreground)", /* gray-500 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* terracotta */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* gray-900 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* gray-50 */
          foreground: "var(--color-card-foreground)", /* gray-900 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* emerald-600 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-600 */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-600 */
          foreground: "var(--color-error-foreground)", /* white */
        },
        // Brand specific colors
        'harvest-gold': "var(--color-harvest-gold)", /* harvest-gold */
        'earth-brown': "var(--color-earth-brown)", /* saddle-brown */
        'rice-green': "var(--color-rice-green)", /* yellow-green */
        'sky-blue': "var(--color-sky-blue)", /* sky-blue */
        'fertile-soil': "var(--color-fertile-soil)", /* dark-brown */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        organic: "8px",
        'organic-sm': "4px",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2', fontWeight: '600' }],
        'value-prop': ['20px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        'golden-xs': '8px',
        'golden-sm': '13px',
        'golden-md': '21px',
        'golden-lg': '34px',
        'golden-xl': '55px',
      },
      boxShadow: {
        'natural': '0 4px 20px rgba(45, 80, 22, 0.1)',
        'natural-lg': '0 8px 30px rgba(45, 80, 22, 0.15)',
        'ai-pulse': '0 0 20px rgba(74, 222, 128, 0.4)',
      },
      animation: {
        'monsoon-flow': 'monsoonFlow 8s ease-in-out infinite',
        'ai-pulse': 'aiPulse 2s infinite ease-in-out',
        'crop-growth': 'cropGrowth 1.5s ease-out forwards',
        'ripple': 'rippleEffect 0.8s ease-out',
      },
      keyframes: {
        monsoonFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        aiPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(74, 222, 128, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(74, 222, 128, 0.6)' },
        },
        cropGrowth: {
          'to': { transform: 'scaleY(1)' },
        },
        rippleEffect: {
          'to': {
            width: '100px',
            height: '100px',
            transform: 'translate(-50%, -50%) scale(3)',
            opacity: '0',
          },
        },
      },
      transitionTimingFunction: {
        'natural': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      backgroundImage: {
        'earth-to-sky': 'linear-gradient(135deg, #8B4513 0%, #2D5016 50%, #87CEEB 100%)',
        'harvest-gradient': 'linear-gradient(135deg, #F4A261 0%, #E76F51 100%)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}