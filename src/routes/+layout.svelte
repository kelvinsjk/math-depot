<script lang="ts">
	import '../app.css';
	import '../katex.min.css';
	import './temml-css/Temml-Latin-Modern.css';
	import Nav from '$lib/components/Nav.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import { darkMode } from '$lib/components/stores';
</script>

<div class="body" class:dark={$darkMode}>
	<!--Prevent flash of color-->
	<!--Prevent flash of color-->
	<!--Prevent flash of color-->
	<script>
		if (typeof initialized === 'undefined') {
			const darkInitial = localStorage.getItem('darkMode');
			if (typeof document !== 'undefined') {
				if (darkInitial === 'true') {
					document.querySelector('.body').classList.add('dark');
				} else {
					document.querySelector('.body').classList.remove('dark');
				}
				initialized = true;
			}
		}
	</script>
	<Nav />
	<div class="bg-goldenrod-light dark:bg-zinc-700">
		<slot />
	</div>
	<BottomNav />
</div>
