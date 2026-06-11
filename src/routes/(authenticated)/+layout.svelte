<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, uiHelpers } from 'flowbite-svelte';
	import {
		ChartOutline,
		CloseSidebarAltOutline,
		GridSolid,
		MailBoxSolid,
		OpenSidebarAltOutline,
		UserSolid
	} from 'flowbite-svelte-icons';
	import { page } from '$app/state';

	const { children } = $props();

	let activeUrl = $state(page.url.pathname);
	const labelClass = 'flex-1 ms-3 whitespace-nowrap';
	const activeClass =
		'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
	const nonActiveClass =
		'flex items-center p-2 text-base font-normal text-primary-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700';
	const demoSidebarUi = uiHelpers();
	let isSidebarOpen = $state(true);
	const closeDemoSidebar = demoSidebarUi.close;
	$effect(() => {
		isSidebarOpen = !demoSidebarUi.isOpen;
		activeUrl = page.url.pathname;
	});

	const itemAClass = $derived(isSidebarOpen ? '' : 'justify-center');
	const itemSpanClass = $derived(isSidebarOpen ? labelClass : 'hidden');
</script>

<div class="relative">
	<Sidebar
		{activeUrl}
		backdrop={true}
		isOpen={isSidebarOpen}
		closeSidebar={closeDemoSidebar}
		position="absolute"
		classes={{ nonactive: nonActiveClass, active: activeClass }}
		class="z-50 h-screen transition-all duration-300 {isSidebarOpen ? 'w-64' : 'w-16!'}"
		disableBreakpoints={true}
	>
		<SidebarGroup class="flex flex-col gap-4 overflow-x-hidden p-2">
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
					{#if isSidebarOpen}
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
					{#if isSidebarOpen}
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
		class="h-screen overflow-auto pl-4 transition-all duration-300 {isSidebarOpen
			? 'md:ml-60'
			: 'md:ml-12'}"
	>
		<div class="mb-2 bg-red-100 px-12 py-4">
			{#if isSidebarOpen}
				<CloseSidebarAltOutline
					class="h-6 w-6 shrink-0 cursor-pointer"
					onclick={demoSidebarUi.toggle}
				/>
			{:else}
				<OpenSidebarAltOutline
					class="h-6 w-6 shrink-0 cursor-pointer"
					onclick={demoSidebarUi.toggle}
				/>
			{/if}
		</div>
		<div class="m-12">
			{@render children()}
		</div>
	</div>
</div>
