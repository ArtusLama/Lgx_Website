import { z } from "zod"
import sendDiscordPartnerContactWebhook from "../utils/sendDiscordPartnerContactWebhook"
import sendMail from "../utils/sendMail"

const cleanHeaderValue = (value: string) => value.replace(/[\r\n]+/g, " ").trim()
const cleanMessage = (value: string) => value.replace(/\0/g, "")

const bodySchema = z.object({
    name: z.string()
        .trim()
        .min(1, "Name is required!")
        .max(120, "Name is too long!")
        .transform(cleanHeaderValue),
    email: z.email("Invalid email address!")
        .trim()
        .min(1, "Email is required!")
        .max(254, "Email is too long!")
        .transform(cleanHeaderValue),
    message: z.string()
        .min(1, "Message is required!")
        .max(4000, "Message is too long!")
        .transform(cleanMessage),
    token: z.string(), // reCAPTCHA token
})

export default defineEventHandler(async (event) => {
    const { success, data, error } = await readValidatedBody(event, bodySchema.safeParse)

    if (!success || error || !data) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid request body! Name, email and message are required.",
            data: error,
        })
    }

    const config = useRuntimeConfig()

    if (!config.nodemailer.auth.user) {
        throw createError({
            statusCode: 500,
            statusMessage: "Cant access email configuration!",
        })
    }

    if (!config.recaptcha.secretKey) {
        throw createError({
            statusCode: 500,
            statusMessage: "Cant access reCAPTCHA configuration!",
        })
    }

    const recaptchaResponse = await $fetch<{ success: boolean }>("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            secret: config.recaptcha.secretKey,
            response: data.token,
        }),
    })

    const isDev = import.meta.dev
    if (!recaptchaResponse.success && !isDev) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid reCAPTCHA token!",
        })
    }

    try {
        await sendDiscordPartnerContactWebhook(data.email, data.name, data.message)

        await sendMail(
            config.nodemailer.auth.user,
            `🤝 Partner Contact from ${data.name} (${data.email})`,
            data.message,
        )

        return {
            success: true,
            message: "Email sent successfully!",
        }
    }
    catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to send email.",
            data: error instanceof Error ? error.message : error,
        })
    }
})
