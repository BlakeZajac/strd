import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    send: defineAction({
        accept: 'form',
        input: z.object({
            name: z.string().min(1, 'Name is required'),
            email: z.string().email(),
            phone: z.string().optional(),
            message: z.string().min(1, 'Message is required'),
            source: z.string().optional(),
        }),
        handler: async (input) => {
            console.log('Contact form submitted:', {
                name: input.name,
                email: input.email,
                phone: input.phone,
                source: input.source,
                message: input.message,
            });

            const html = `
            <h2>New contact form submission</h2>
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Phone:</strong> ${input.phone}</p>
            <p><strong>Source:</strong> ${input.source}</p>

            <p><strong>Message:</strong></p>
            <p>${input.message.replace(/\n/g, '<br />')}</p>
            `
            const { data, error } = await resend.emails.send({
                from: 'Blake Zajac <website@blakezajac.com>',
                to: ['contact@blakezajac.com'],
                subject: `New contact form submission from ${input.name}`,
                html,
            });

            console.log('Resend response:', { data, error });

            if (error) {
                throw new ActionError({
                    code: 'BAD_REQUEST',
                    message: error.message,
                });
            }

            return data;
        }
    })
}