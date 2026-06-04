export default function (to: string, subject: string, text: string) {
    const { sendMail, transport } = useNodeMailer()

    if (!transport) {
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to create email transport!",
        })
    }
    return sendMail({
        to,
        subject,
        text,
    })
}
