<script lang="ts">
	import FormInput from '../../../../components/ui/field-input.svelte';
	import FormControl from '../../../../components/ui/form-control.svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { Model } from '../_types/schema';

	let {
		form,
		errors
	}: {
		form: SuperForm<Model>['form'];
		errors: SuperForm<Model>['errors'];
	} = $props();
</script>

<FormControl id="email" label="Email" errors={$errors.email}>
	<FormInput type="text" name="email" errors={$errors.email} bind:value={$form.email} />
</FormControl>

<FormControl id="password" label="Password" errors={$errors.password}>
	<FormInput
		type="password"
		name="password"
		errors={$errors.password}
		bind:value={$form.password}
	/>
</FormControl>
