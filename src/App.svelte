<!-- <script>
	import ImageGrid from './ImageGrid.svelte'

	const chars = 'abcdefghijklmnopqrstuvwxyz'

	let currentVal = 0;
	let currentPrefix = "";
	$: {
		let v = "";
		let c = currentVal - 1;
		if(c == 0) { v = chars[0] }
		while(c > 0) {
			v = chars[(c % chars.length)] + v
			c = Math.floor(c / chars.length)
		}
		currentPrefix = v;
	}

	let values = [ ];
	$: {
		values = [ ];
		for(let i = 0; i < chars.length; i++) {
			values.push(currentPrefix + chars[i]);
		}
	}
</script>

<h1>Current prefix: {currentPrefix}</h1>
<div style="float: right">
	<button disabled={currentVal <= 0} on:click={() => currentVal -= 1}>Prev</button>
	<button on:click={() => currentVal += 1}>Next</button>
</div>


<ImageGrid {values} ></ImageGrid>

<style>
h1 {
	display: inline;
	padding-right: 1em;
	font-family: sans-serif;
}
</style> -->

<script>
import ImageGrid from './ImageGrid.svelte'
// import values from './greetings.js'
import babynames from './babynames.js'

const distinct = (value, index, self) => {
	return self.indexOf(value) === index;
}

let values = babynames.slice(0, 100).map(name => name.toLowerCase())
</script>

<ImageGrid values={values}></ImageGrid>