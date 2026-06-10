<script lang="ts">
	let { errors }: { errors?: string | string[] } = $props();

	let displayError = $derived(
		Array.isArray(errors) ? errors[0] : errors
	);
</script>

<div>{#if displayError}<span class="text-error">{displayError}</span>{/if}</div>
