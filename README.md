# Portfolio Webseite for Raspocket Studios

## Useful commands

- `pnpx nuxt-og-image generate-secret` - Generates a random secret for the OG image generation. This should be run at least once before deploying the website, and the generated secret should be set as an environment variable named `OG_IMAGE_SECRET` in the deployment environment.
- `pnpm dlx nuxt-seo-utils icons --source favicon.svg` - CURRENTLY NOT WORKING?! Generates favicons and app icons from a source SVG file. The generated icons will be placed in the `public` directory. Everything else is handled automatically by the `@nuxtjs/seo` module, so no further configuration is needed.
