<script>
export let values = [ "asdf", "qwerty" ];
export let dim = 200;

import LabelledImage from "./LabelledImage.svelte"
</script>


<div id="grid" style="--dim: {dim}px">
	{#each values as value (value)}
	<LabelledImage {value} {dim} on:imageClicked></LabelledImage>
	{/each}
</div>

<style>
#grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--dim), 1fr));
	/* grid-template-columns: repeat(auto-fit, minmax(auto, 150px)); */
}
</style>