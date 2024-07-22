module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
        'bg-green-500',
        'opacity-0',
        'opacity-100',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}