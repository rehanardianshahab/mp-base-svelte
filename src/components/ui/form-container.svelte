<script lang="ts" generics="T extends Record<string, unknown>, M = unknown">
	import {
		superForm,
		type SuperValidated,
		type SuperForm,
		type FormOptions
	} from 'sveltekit-superforms';
	import { untrack, type Snippet } from 'svelte';

	let {
		data,
		validators,
		options = {},
		children,
		class: className = ''
	}: {
		data: SuperValidated<T, M>;
		validators?: FormOptions<T, M>['validators'];
		options?: Omit<FormOptions<T, M>, 'validators'>;
		children: Snippet<[SuperForm<T, M>]>;
		class?: string;
	} = $props();

	const sf = superForm(
		untrack(() => data),
		{
			...untrack(() => options),
			validators: untrack(() => validators)
		}
	);
</script>

<form method="POST" use:sf.enhance class={className}>
	{@render children(sf)}
</form>
