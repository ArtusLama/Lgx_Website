export default async function (from: string, name: string, text: string) {
    const config = useRuntimeConfig()
    const webhookUrl = config.discordContactWebhookUrl

    if (!webhookUrl) {
        console.warn("Discord webhook URL not configured! Skipping Discord notification.")
        return
    }

    try {
        await $fetch(webhookUrl, {
            method: "POST",
            body: {
                embeds: [
                    {
                        color: 3175387,
                        author: {
                            name: "[🌐 lgx.art > partners ] New Partner Contact Form Message",
                            url: "https://lgx.art/partners",
                        },
                        timestamp: new Date().toISOString(),
                        fields: [
                            {
                                name: "Name",
                                value: `${name}`,
                                inline: true,
                            },
                            {
                                name: "E-Mail:",
                                value: `${from}`,
                                inline: true,
                            },
                            {
                                name: "Message",
                                value: `${text}`,
                                inline: false,
                            },
                        ],
                    },
                ],
            },
        })
    }
    catch (error) {
        console.error("Discord webhook failed", error)
    }
}
