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
		grid-template-columns: repeat(auto-fit, minmax(var(--dim), 1fr));
		/* grid-template-columns: repeat(auto-fit, minmax(auto, 150px)); */
	}
</style>
