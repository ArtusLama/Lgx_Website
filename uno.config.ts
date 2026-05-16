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
    theme: {
        colors: {
            // TODO: make all colors to oklch

            // MAIN BACKGROUND AND TEXT COLORS
            "background": "#faf6ef", // Main Page Background
            "foreground": "#1e1e1e", // Main Text
            "background-secondary": "rgb(13, 13, 13)", // Background for other sections
            "foreground-secondary": "rgb(247, 247, 247)", // Text for other sections

            // ACCENT COLORS
            "primary": "#ff4081", // Primary Accent Color
            "primary-foreground": "white", // Text for primary elements
            "secondary": "#0070f3", // Secondary Accent Color
            "secondary-foreground": "red",
        },
        spacing: {
            "navbar-height": "4rem",
        },
        font: {
            jakarta: "Plus Jakarta Sans, sans-serif",
        },
    },
})
