<script>
	export let values = ["asdf", "qwerty"];
	export let dim = 200;

	import LabelledImageButton from "./LabelledImageButton.svelte";
</script>

<div id="grid" style="--dim: {dim}px">
	{#each values as value (value)}
		<LabelledImageButton {value} {dim} on:imageClicked />
	{/each}
</div>

<style>
	#grid {
		display: grid;
		--mdim: min(var(--dim), 35vw); /* 1/3 < 35vw < 1/2 : on small screens, try to have at minimum 2 columns */
		grid-template-columns: repeat(auto-fit, minmax(var(--mdim), 1fr));
	}
</style>
