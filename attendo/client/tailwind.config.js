/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // A nice modern indigo
                secondary: '#64748B', // Slate gray for text
                bgLight: '#F3F4F6', // Light gray background like your images
            }
        },
    },
    plugins: [],
}