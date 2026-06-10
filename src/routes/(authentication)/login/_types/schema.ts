import z from 'zod';

export const schema = z.object({
	email: z.string().email({ error: 'Email tidak valid'}),
	password: z.string().min(6, { error: 'Password minimal 6 karakter'})
});

export type Model = z.infer<typeof schema>;
