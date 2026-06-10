import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { schema } from './_types/schema';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(schema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		console.log('Login attempt:', form.data.email);

		// Handle login logic here

		return { form };
	}
};
