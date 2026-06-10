<script lang="ts">
	import { cn, Label } from "flowbite-svelte";

	let { id, label, hasError = false }: {
		id: string;
		label: string;
		hasError?: boolean;
	} = $props();
</script>
<Label for={id} class={cn('text-heading-5', hasError ? 'text-error' : '')}>{label}</Label>