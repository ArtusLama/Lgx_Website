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
            // TODO: Make real color palette
            "background": "oklch(0.9848 0.0013 106.4233)",
            "foreground": "oklch(0.1469 0.0041 49.2499)",
            "primary": "oklch(0.6698 0.1803 42.9750)",
            "primary-foreground": "oklch(0.9848 0.0013 106.4233)",
            "secondary": "oklch(0.9634 0.0169 50.4365)",
            "secondary-foreground": "oklch(0.6698 0.1803 42.9750)",
            "muted": "oklch(0.9699 0.0013 106.4238)",
            "muted-foreground": "oklch(0.5534 0.0116 58.0708)",
            "border": "oklch(0.9232 0.0026 48.7171)",
            "destructive": "oklch(0.5680 0.2002 26.4057)",
            "destructive-foreground": "oklch(0.9848 0.0013 106.4233)",

            "dark-background": "oklch(0.1469 0.0041 49.2499)",
            "dark-foreground": "oklch(0.9848 0.0013 106.4233)",
            "dark-primary": "oklch(0.6698 0.1803 42.9750)",
            "dark-primary-foreground": "oklch(0.9848 0.0013 106.4233)",
            "dark-secondary": "oklch(0.2685 0.0063 34.2976)",
            "dark-secondary-foreground": "oklch(0.9848 0.0013 106.4233)",
            "dark-muted": "oklch(0.2685 0.0063 34.2976)",
            "dark-muted-foreground": "oklch(0.7161 0.0091 56.2590)",
            "dark-border": "oklch(0.2685 0.0063 34.2976)",
            "dark-destructive": "oklch(0.6368 0.2078 25.3313)",
            "dark-destructive-foreground": "oklch(0.9848 0.0013 106.4233)",
        },
        spacing: {
            "navbar-height": "4rem",
        },
    },
})
