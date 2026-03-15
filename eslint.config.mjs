import antfu from "@antfu/eslint-config"

export default antfu({
    typescript: true,
    stylistic: {
        indent: 4,
        quotes: "double",
    },
    yaml: {
        overrides: {
            "style/no-multi-spaces": "off",
            "yaml/indent": ["error", 4],
        },
    },
})
