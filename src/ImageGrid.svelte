<script>
export let values = [ "asdf", "qwerty" ];
export let dim = 200;
</script>


<div id="grid" style="--dim: {dim}px">
	{#each values as value (value)}
	<div>
		<img width={dim} height={dim} src="https://api.checkface.ml/api/face/?dim={dim}&value={encodeURIComponent(value)}" alt={value}>
		<p>{value}</p>
	</div>
	{/each}
</div>

<style>
#grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--dim), 1fr));
	/* grid-template-columns: repeat(auto-fit, minmax(auto, 150px)); */
}

#grid div {
	position: relative;
}

img {
	width: 100%;
	height: auto;
	display: block;
}

p {
	position: absolute;
	bottom: 0;
	margin: 0;
	color: white;
	font-size: 2em;
	font-family: sans-serif;
	right: 10px;

	color: rgb(255, 255, 255); 
	text-shadow: 2px 2px black;

}
</style>