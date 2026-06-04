<script setup lang="ts">
import { useReCaptcha } from "vue-recaptcha-v3"
import { z } from "zod"

const contactForm = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    message: z.string().min(1, "Message is required").max(4000, "Message is too long"),
})

const status = ref<{ type: "success" | "error", message: string } | null>(null)
const isSubmitting = ref(false)

const recaptcha = useReCaptcha()

async function submitForm(this: any, event: Event) {
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    status.value = null
    if (isSubmitting.value)
        return

    if (!recaptcha) {
        status.value = {
            type: "error",
            message: "ReCaptcha is not loaded. Please try again later.",
        }
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
        status.value = {
            type: "error",
            message: error?.issues?.[0]?.message ?? "Please fill out the form correctly.",
        }
        return
    }

    try {
        isSubmitting.value = true
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
            status.value = {
                type: "success",
                message: "Your message has been sent successfully!",
            }
            form.reset()
        }
        else {
            status.value = {
                type: "error",
                message: "There was an error sending your message. Please try again later.",
            }
        }
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (error) {
        status.value = {
            type: "error",
            message: "There was an error sending your message. Please try again later.",
        }
    }
    finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div class="p-8 border border-foreground-secondary/15 rounded-2xl bg-foreground-secondary/5 relative overflow-hidden md:p-10">
        <div class="rounded-full bg-primary/20 opacity-70 h-40 w-40 pointer-events-none absolute blur-3xl -right-10 -top-10" />
        <div class="relative z-10">
            <p class="text-xs text-foreground-secondary/80 tracking-widest font-bold uppercase">
                Direct message
            </p>
            <h3 class="text-2xl font-black font-jakarta mt-2 sm:text-3xl">
                Tell me about your idea
            </h3>
            <p class="text-sm text-foreground-secondary/70 mt-2">
                I will reply with pricing and next steps.
            </p>

            <form class="mt-6 gap-4 grid" @submit.prevent="submitForm">
                <div class="gap-4 grid sm:grid-cols-2">
                    <label class="gap-2 grid">
                        <span class="text-xs text-foreground-secondary/80 tracking-wider font-semibold uppercase">Name</span>
                        <input
                            class="text-foreground-secondary px-4 py-3 outline-none border border-foreground-secondary/15 rounded-xl bg-foreground-secondary/5 w-full transition placeholder:text-foreground-secondary/40 focus:(border-primary/60 ring-2 ring-primary/20)"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                        >
                    </label>
                    <label class="gap-2 grid">
                        <span class="text-xs text-foreground-secondary/80 tracking-wider font-semibold uppercase">Email</span>
                        <input
                            class="text-foreground-secondary px-4 py-3 outline-none border border-foreground-secondary/15 rounded-xl bg-foreground-secondary/5 w-full transition placeholder:text-foreground-secondary/40 focus:(border-primary/60 ring-2 ring-primary/20)"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                        >
                    </label>
                </div>

                <label class="gap-2 grid">
                    <span class="text-xs text-foreground-secondary/80 tracking-wider font-semibold uppercase">Message</span>
                    <textarea
                        class="text-foreground-secondary px-4 py-3 outline-none border border-foreground-secondary/15 rounded-xl bg-foreground-secondary/5 min-h-40 w-full resize-none transition placeholder:text-foreground-secondary/40 focus:(border-primary/60 ring-2 ring-primary/20)"
                        name="message"
                        placeholder="Project details, deadline, references..."
                        required
                    />
                </label>

                <button
                    class="text-primary-foreground tracking-wide font-semibold mt-2 px-6 py-3 rounded-xl bg-primary transition-transform hover:bg-primary/90 disabled:(opacity-70 cursor-not-allowed) active:scale-95"
                    type="submit"
                    :disabled="isSubmitting"
                    :aria-busy="isSubmitting"
                >
                    <Icon
                        :name="isSubmitting ? 'lucide:loader-2' : 'lucide:send'"
                        class="mr-2 -mb-0.5"
                        :class="isSubmitting ? 'animate-spin' : ''"
                        :size="18"
                    />
                    {{ isSubmitting ? 'Sending...' : 'Send message' }}
                </button>

                <div
                    v-if="status"
                    class="text-sm tracking-wide font-semibold mt-3 px-4 py-3 border rounded-xl flex gap-2 items-start"
                    :class="status.type === 'success' ? 'border-primary/30 bg-primary/10 text-primary' : 'border-red-500/40 bg-red-500/10 text-red-200'"
                    role="status"
                    aria-live="polite"
                >
                    <p>
                        <span class="text-[0.65rem] tracking-[0.25em] opacity-80 block uppercase">
                            {{ status.type === 'success' ? 'Success' : 'Error' }}
                        </span>
                        <span class="block">
                            {{ status.message }}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
