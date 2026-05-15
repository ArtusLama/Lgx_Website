// @ts-check
import antfu from "@antfu/eslint-config"

export default antfu({
    vue: true,
    typescript: true,
    unocss: true,
    stylistic: {
        indent: 4,
        quotes: "double",
    },
    yaml: false,
    ignores: [
        "content/**/*json",
    ],
})
