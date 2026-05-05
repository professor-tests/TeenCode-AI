import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [
                tailwindcss({
                    content: [
                        "./src/**/*.{js,jsx,ts,tsx}",
                        "./index.html",
                    ],
                    darkMode: "class",
                    theme: {
                        extend: {
                            colors: {
                                border: "hsl(var(--border))",
                                input: "hsl(var(--input))",
                                ring: "hsl(var(--ring))",
                                background: "hsl(var(--background))",
                                foreground: "hsl(var(--foreground))",
                                primary: {
                                    DEFAULT: "hsl(var(--primary))",
                                    foreground: "hsl(var(--primary-foreground))",
                                },
                                secondary: {
                                    DEFAULT: "hsl(var(--secondary))",
                                    foreground: "hsl(var(--secondary-foreground))",
                                },
                                destructive: {
                                    DEFAULT: "hsl(var(--destructive))",
                                    foreground: "hsl(var(--destructive-foreground))",
                                },
                                muted: {
                                    DEFAULT: "hsl(var(--muted))",
                                    foreground: "hsl(var(--muted-foreground))",
                                },
                                accent: {
                                    DEFAULT: "hsl(var(--accent))",
                                    foreground: "hsl(var(--accent-foreground))",
                                },
                                popover: {
                                    DEFAULT: "hsl(var(--popover))",
                                    foreground: "hsl(var(--popover-foreground))",
                                },
                                card: {
                                    DEFAULT: "hsl(var(--card))",
                                    foreground: "hsl(var(--card-foreground))",
                                },
                            },
                            borderRadius: {
                                lg: "var(--radius)",
                                md: "calc(var(--radius) - 4px)",
                                sm: "calc(var(--radius) - 8px)",
                            },
                        },
                    },
                    plugins: [require("tailwindcss-animate")],
                }),
                autoprefixer(),
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
});