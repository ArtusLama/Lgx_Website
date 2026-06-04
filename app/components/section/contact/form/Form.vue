<!-- eslint-disable no-alert -->
<!-- TODO: temp fix -->
<script setup lang="ts">
import { useReCaptcha } from "vue-recaptcha-v3"
import { z } from "zod"

const contactForm = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    message: z.string().min(1, "Message is required").max(4000, "Message is too long"),
})

const recaptcha = useReCaptcha()

async function submitForm(this: any, event: Event) {
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    if (!recaptcha) {
        alert("ReCaptcha is not loaded. Please try again later.")
        return
    }
    const { executeRecaptcha, recaptchaLoaded } = recaptcha

    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
    }

    const { success, data: validatedData, error } = contactForm.safeParse(data)

    if (!success || !validatedData || error) {
        alert(`Please fill out the form correctly. - ${error?.message}`)
        return
    }

    try {
        await recaptchaLoaded()
        const token = await executeRecaptcha("contact_form")

        // send token to server alongside your form data
        // Send the validated data to the server
        const response = await $fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...validatedData, token }),
        })

        if (response.success) {
            alert("Your message has been sent successfully!")
            form.reset()
        }
        else {
            alert(`There was an error sending your message. Please try again later`)
        }
    }
    catch (error) {
        alert(`There was an error sending your message. Please try again later - ${error}`)
    }
}
</script>

<template>
    <form @submit.prevent="submitForm">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" placeholder="Your Message" required />

        <button type="submit">
            Send
        </button>
    </form>
</template>
