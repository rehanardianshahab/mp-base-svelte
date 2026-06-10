<script lang="ts">
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { Button, Card } from 'flowbite-svelte';
	import type { FormOptions } from 'sveltekit-superforms';

	import { schema, type Model } from './_types/schema.js';
	import FormComponents from './_components/form.svelte';
	import FormContainer from '../../../components/ui/form-container.svelte';
	import PageTitle from '../../../components/ui/page-title.svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const handleSubmit: FormOptions<Model>['onSubmit'] = ({ action, formData }) => {
		console.log('Form akan dikirim:', formData);
		action.searchParams.set('client_type', 'desktop');
		// cancel()
	};

	const handleUpdated: FormOptions<Model>['onUpdated'] = ({ form }) => {
		if (form.valid) {
			console.log('Submit sukses! Data valid.');
			goto('/dashboard');
		} else {
			console.log('Submit gagal karena data tidak valid.');
		}
	};
</script>

<svelte:head>
	<title>Login Page</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<div>
	<div class="flex h-screen items-center justify-center">
		<FormContainer
			data={data.form}
			validators={zod4Client(schema)}
			options={{ validationMethod: 'oninput', onUpdated: handleUpdated, onSubmit: handleSubmit }}
		>
			{#snippet children(sf)}
				<Card class="flex w-md gap-4 p-6">
					<PageTitle title="Login" />
					<FormComponents form={sf.form} errors={sf.errors} />
					<Button type="submit" class="w-full cursor-pointer bg-primary-500 text-white transition-colors duration-300">Kirim</Button>
				</Card>
			{/snippet}
		</FormContainer>
	</div>
</div>
