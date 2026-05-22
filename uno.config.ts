import { defineConfig, presetWind4, transformerCompileClass, transformerDirectives, transformerVariantGroup } from "unocss"

export default defineConfig({
    presets: [
        presetWind4(),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
        transformerCompileClass(),
    ],
    shortcuts: {
        "underline-hover-anim": "relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:bg-current before:transition-transform before:duration-300 before:scale-x-0 before:origin-right hover:before:scale-x-100 hover:before:origin-left",
    },
    theme: {
        colors: {
            // TODO: make all colors to oklch

            // MAIN BACKGROUND AND TEXT COLORS
            "background": "#faf6ef", // Main Page Background
            "foreground": "#1e1e1e", // Main Text
            "background-secondary": "rgb(13, 13, 13)", // Background for other sections
            "foreground-secondary": "rgb(247, 247, 247)", // Text for other sections

            "nav-background": "#f0ece6", // Navbar Background
            "nav-foreground": "#1e1e1e", // Navbar Text
            "nav-link-active": "#ff4081", // Active Navbar Link

            // ACCENT COLORS
            "primary": "#ff4081", // Primary Accent Color
            "primary-foreground": "white", // Text for primary elements
            "secondary": "#0070f3", // Secondary Accent Color
            "secondary-foreground": "red", // Text for secondary elements
        },
        spacing: {
            "navbar-height": "4rem",
        },
        font: {
            jakarta: "Plus Jakarta Sans, sans-serif",
        },
    },
})
