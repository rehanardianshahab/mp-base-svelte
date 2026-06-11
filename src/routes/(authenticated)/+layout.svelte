<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, uiHelpers, Button } from 'flowbite-svelte';
	import { ChartOutline, GridSolid, MailBoxSolid, UserSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/state';

	const { children } = $props();

	let activeUrl = $state(page.url.pathname);
	const labelClass = 'flex-1 ms-3 whitespace-nowrap';
	const activeClass =
		'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
	const nonActiveClass =
		'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';
	const demoSidebarUi = uiHelpers();
	let isDemoOpen = $state(false);
	const closeDemoSidebar = demoSidebarUi.close;
	$effect(() => {
		isDemoOpen = demoSidebarUi.isOpen;
		activeUrl = page.url.pathname;
	});

	// Collapsible helpers for classes
	const itemAClass = $derived(isDemoOpen ? '' : 'justify-center');
	const itemSpanClass = $derived(isDemoOpen ? labelClass : 'hidden');
</script>

<div class="relative">
	<Sidebar
		{activeUrl}
		backdrop={false}
		isOpen={true}
		closeSidebar={closeDemoSidebar}
		position="absolute"
		classes={{ nonactive: nonActiveClass, active: activeClass }}
		class="z-50 h-screen transition-all duration-300 {isDemoOpen ? 'w-64' : 'w-16!'}"
		disableBreakpoints={true}
	>
		<SidebarGroup class="flex flex-col gap-4 overflow-x-hidden">
			<SidebarItem
				label="Dashboard"
				href="/dashboard"
				spanClass={itemSpanClass}
				aClass={itemAClass}
			>
				{#snippet icon()}
					<ChartOutline
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Kanban" spanClass={itemSpanClass} aClass={itemAClass}>
				{#snippet icon()}
					<GridSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
				{#snippet subtext()}
					{#if isDemoOpen}
						<span
							class="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
							>Pro</span
						>
					{/if}
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Inbox" spanClass={itemSpanClass} aClass={itemAClass}>
				{#snippet icon()}
					<MailBoxSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
				{#snippet subtext()}
					{#if isDemoOpen}
						<span
							class="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-primary-200 p-3 text-sm font-medium text-primary-600 dark:bg-primary-900 dark:text-primary-200"
							>3</span
						>
					{/if}
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Profile" href="/profile" spanClass={itemSpanClass} aClass={itemAClass}>
				{#snippet icon()}
					<UserSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem>
		</SidebarGroup>
	</Sidebar>
	<div
		class="h-96 overflow-auto px-4 transition-all duration-300 {isDemoOpen
			? 'md:ml-60'
			: 'md:ml-12'}"
	>
		<div class="mb-2 bg-red-100 p-4">
			<Button onclick={demoSidebarUi.toggle}>
				{isDemoOpen ? 'Close Sidebar' : 'Open Sidebar'}
			</Button>
			{JSON.stringify(isDemoOpen)}
		</div>
		{@render children()}
	</div>
</div>
