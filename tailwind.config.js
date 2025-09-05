/** @type {import('tailwindcss').Config} */
export default {
    content: [
        ".src/**/*.{html, js, jsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['FiraGo', 'sans-serif']
            },
            colors: {
                'my-purple': '#8338EC',
                'my-grey': '#DEE2E6',
            }
        },
        
    },
    plugins: [],
}