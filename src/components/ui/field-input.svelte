<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from 'flowbite-svelte';

	let {
		value = $bindable(),
		errors,
		class: className,
		type = 'text',
		variant = 'outline',
		size = 'md',
		...restProps
	}: Omit<HTMLInputAttributes, 'size'> & {
		value?: string | number | null;
		errors?: string | string[];
		variant?: 'outline' | 'filled' | 'underlined';
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	let hasError = $derived(!!errors && (Array.isArray(errors) ? errors.length > 0 : true));

	const sizeClasses = {
		sm: 'h-8 px-2.5 text-xs rounded',
		md: 'h-10 px-3 text-sm rounded-md',
		lg: 'h-12 px-4 text-base rounded-lg'
	};

	const variantClasses = $derived({
		outline: hasError
			? 'border border-error text-error focus-visible:ring-error placeholder:text-danger-300 bg-danger-50/10'
			: 'border border-neutral-300 bg-white focus-visible:ring-primary-500 focus-visible:border-primary-500',
		filled: hasError
			? 'border border-error text-error bg-danger-50/15 focus-visible:ring-error focus-visible:border-error'
			: 'border border-transparent bg-neutral-100 hover:bg-neutral-200/50 focus-visible:bg-white focus-visible:border-primary-500 focus-visible:ring-primary-500',
		underlined: hasError
			? 'border-b-2 border-t-0 border-l-0 border-r-0 border-error text-error bg-transparent rounded-none px-0 focus-visible:ring-0'
			: 'border-b border-t-0 border-l-0 border-r-0 border-neutral-300 bg-transparent rounded-none px-0 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary-500'
	});
</script>

<input
	{type}
	bind:value
	class={cn(
		'flex w-full ring-offset-white transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
		sizeClasses[size],
		variantClasses[variant],
		className
	)}
	{...restProps}
/>
