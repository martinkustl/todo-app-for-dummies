<script lang="ts">
	export let isHeading: boolean;
</script>

<li class={isHeading ? 'flex-auto' : 'flex-1'}>
	{#if isHeading}
		<h1>
			<slot />
		</h1>
	{:else}
		<slot />
	{/if}
</li>
