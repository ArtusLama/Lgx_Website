import { defineConfig, presetWind4, transformerCompileClass, transformerVariantGroup } from "unocss"

export default defineConfig({
    presets: [
        presetWind4(),
    ],
    transformers: [
        transformerVariantGroup(),
        transformerCompileClass(),
    ],
})
