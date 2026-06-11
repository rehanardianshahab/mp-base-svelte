<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<Card class="w-64 p-6">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		Not so simple card
	</h5>
	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
		Here is some quick example text to build on top of the card title and make by the card content.
	</p>
	<Button color="blue">Read more</Button>
</Card>
