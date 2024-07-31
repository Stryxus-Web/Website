/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        // Mobile
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        // Tablet
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        // Desktop
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        // Desktop
      }
    },
    plugins: [],
};