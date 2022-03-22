<script>
	import Nav from '../components/Layout/Nav.svelte';
	import '../app.css';
	import ErrorToast from '../components/shared/ErrorToast/ErrorToast.svelte';
</script>

<Nav />
<main class="p-6">
	<slot />
</main>
<ErrorToast />
