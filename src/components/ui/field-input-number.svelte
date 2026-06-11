<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	let {
		value = $bindable(),
		errors,
		class: className,
		type = 'text',
		variant = 'outline',
		size = 'md',
		prefix,
		suffix,
		prefixSnippet,
		suffixSnippet,
		isCurrency = false,
		...restProps
	}: Omit<HTMLInputAttributes, 'size'> & {
		value?: string | number | null;
		errors?: string | string[];
		variant?: 'outline' | 'filled' | 'underlined';
		size?: 'sm' | 'md' | 'lg';
		prefix?: string;
		suffix?: string;
		prefixSnippet?: Snippet;
		suffixSnippet?: Snippet;
		isCurrency?: boolean;
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

	let inputEl: HTMLInputElement;
	let inputValue = $state('');

	function formatNumberString(str: string): string {
		let clean = str.replace(/\D/g, '');
		if (!clean) return '';

		return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}

	function handleInput() {
		if (!isCurrency) {
			value = inputEl.value;
			return;
		}

		const start = inputEl.selectionStart;
		const originalLength = inputEl.value.length;

		const rawValue = inputEl.value.replace(/\./g, '');
		const parsed = parseFloat(rawValue);
		value = isNaN(parsed) ? null : parsed;

		const formatted = formatNumberString(rawValue);
		inputEl.value = formatted;
		inputValue = formatted;

		const newLength = formatted.length;
		if (start !== null) {
			const cursorOffset = newLength - originalLength;
			inputEl.setSelectionRange(start + cursorOffset, start + cursorOffset);
		}
	}

	$effect(() => {
		if (isCurrency) {
			const raw = value !== null && value !== undefined ? Math.floor(Number(value)).toString() : '';
			const formatted = formatNumberString(raw);
			if (inputValue !== formatted) {
				inputValue = formatted;
			}
		} else {
			const strVal = value !== null && value !== undefined ? value.toString() : '';
			if (inputValue !== strVal) {
				inputValue = strVal;
			}
		}
	});

	const hasPrefix = $derived(prefix || prefixSnippet || (isCurrency && !prefix && !prefixSnippet));
</script>

<div class="relative flex w-full items-center">
	{#if hasPrefix}
		<span
			class={cn(
				'pointer-events-none absolute z-10 flex items-center font-medium text-neutral-400 select-none',
				size === 'sm' ? 'left-2.5 text-xs' : size === 'lg' ? 'left-4 text-base' : 'left-3 text-sm'
			)}
		>
			{#if prefixSnippet}
				{@render prefixSnippet()}
			{:else}
				{prefix || (isCurrency ? 'Rp' : '')}
			{/if}
		</span>
	{/if}

	<input
		{type}
		bind:this={inputEl}
		bind:value={inputValue}
		oninput={handleInput}
		class={cn(
			'flex w-full ring-offset-white transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
			sizeClasses[size],
			variantClasses[variant],
			hasPrefix && (size === 'lg' ? 'pl-12' : 'pl-9'),
			(suffix || suffixSnippet) && (size === 'lg' ? 'pr-12' : 'pr-9'),
			className
		)}
		{...restProps}
	/>

	{#if suffix || suffixSnippet}
		<span
			class={cn(
				'pointer-events-none absolute z-10 flex items-center font-medium text-neutral-400 select-none',
				size === 'sm'
					? 'right-2.5 text-xs'
					: size === 'lg'
						? 'right-4 text-base'
						: 'right-3 text-sm'
			)}
		>
			{#if suffixSnippet}
				{@render suffixSnippet()}
			{:else}
				{suffix}
			{/if}
		</span>
	{/if}
</div>
