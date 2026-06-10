<script lang="ts">
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { Button, Card } from 'flowbite-svelte';

	import { schema } from './_types/schema.js';
	import FormComponents from './_components/form.svelte';
	import FormContainer from '../../../components/ui/form-container.svelte';
	import PageTitle from '../../../components/ui/page-title.svelte';

	let { data } = $props();
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
			options={{ validationMethod: 'oninput' }}
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
