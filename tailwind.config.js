module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require("@tailwindcss/typography")
  ],
  daisyui: {
    styled: true,
    themes: [
      {    

        'retro': { 
          fontFamily: {
            display: ['"Courier New", Courier, monospace'],
            body: ['"VT323", monospace'],
          },
          'primary': '#ff00ff',           /* Primary color */
          'primary-focus': '#ff77aa',     /* Primary color - focused */
          'primary-content': '#ffffff',   /* Foreground content color to use on primary color */

          'secondary': '#00ffff',         /* Secondary color */
          'secondary-focus': '#33cccc',   /* Secondary color - focused */
          'secondary-content': '#ffffff', /* Foreground content color to use on secondary color */

          'accent': '#ffff00',            /* Accent color */
          'accent-focus': '#cccc00',      /* Accent color - focused */
          'accent-content': '#333333',    /* Foreground content color to use on accent color */

          'neutral': '#33334d',           /* Neutral color */
          'neutral-focus': '#2a2a40',     /* Neutral color - focused */
          'neutral-content': '#ffffff',   /* Foreground content color to use on neutral color */

          'base-100': '#3f3f50',          /* Base color of page, used for blank backgrounds */
          'base-200': '#525266',          /* Base color, a little darker */
          'base-300': '#6f6f80',          /* Base color, even more darker */
          'base-content': '#e0e0e0',      /* Foreground content color to use on base color */

          'info': '#76daff',              /* Info */
          'success': '#99ff66',           /* Success */
          'warning': '#ffcc33',           /* Warning */
          'error': '#ff6666',             /* Error */
        },
      },
      // backup themes:
      // 'dark',
      // 'synthwave'
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}