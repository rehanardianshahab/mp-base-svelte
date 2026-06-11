<script lang="ts">
	import FormMessage from './form-message.svelte';
	import type { Snippet } from 'svelte';
	import FormLabel from './form-label.svelte';

	let {
		id,
		label,
		errors,
		children
	}: {
		id: string;
		label: string;
		errors?: string | string[];
		children: Snippet;
	} = $props();
</script>

<div class="flex flex-col gap-2">
	<FormLabel {id} {label} hasError={errors ? true : false} />
	{@render children()}
	<FormMessage {errors} />
</div>
