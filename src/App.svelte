<script>
	// import VirtualList from '@sveltejs/svelte-virtual-list';
	import VirtualList from "./VirtualList.svelte";
	import SvelteInfiniteScroll from "svelte-infinite-scroll";
	import ImageGrid from "./ImageGrid.svelte";
	import LabelledImage from "./LabelledImage.svelte";
	import names from "./babynames.js";
	import * as checkface from "./checkface";
	import { scale } from 'svelte/transition';

	function chunk(arr, chunkSize) {
		var R = [];
		for (var i = 0, len = arr.length; i < len; i += chunkSize)
			R.push(arr.slice(i, i + chunkSize));
		return R;
	}

	let chunks = chunk(
		names.map((name) => name.toLowerCase()),
		24
	);

	let size = 2;
	let page = 2;
	let virtualList;

	let items = chunks.splice(0, page * size);
	$: items = [...items, ...chunks.slice(page * size, size * (page + 1))];

	function loadMore() {
		console.log("loadmore");
		page += 1;
	}

	let selectedValue = null;

	function imageClicked(event) {
		if (selectedValue !== null) {
			window.location.href = checkface.facemorph(selectedValue, event.detail);
		} else {
			selectedValue = event.detail;
		}
	}

	function selectedImageClicked() {
		selectedValue = null;
	}
</script>

{#if selectedValue !== null}
	<div class="selected-image" out:scale={{ duration: 400 }}>
		<LabelledImage
			dim="200"
			value={selectedValue}
			on:imageClicked={selectedImageClicked}
		/>
	</div>
{/if}
<VirtualList bind:viewport={virtualList} {items} let:item>
	<ImageGrid values={item} on:imageClicked={imageClicked} />
</VirtualList>
<SvelteInfiniteScroll
	threshold={100}
	elementScroll={virtualList}
	on:loadMore={loadMore}
/>

<style>
	.selected-image {
		position: fixed;
		bottom: 1em;
		left: 1em;
		z-index: 3;
		margin: 0;
		animation: fadeUp 0.4s ease;
		box-shadow: 3px 4px 8px rgb(0 0 0 / 50%);
	}

	.selected-image::before {
		content: 'x';
		font-size: 10em;
		color: rgba(255, 255, 255, 0.829);
		font-family: Arial, sans-serif;
		text-shadow: 2px 2px black;
		font-family: sans-serif;

		z-index: 5;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: center;

		opacity: 0;
		transform: rotate(-90deg);
		transition: opacity 0.2s, transform 0.2s;

		pointer-events: none;
	}

	.selected-image:hover::before {
		opacity: 1;
		transform: rotate(0);
	}

	@keyframes fadeUp {
		0% {
			opacity: 0;
			transform: translateY(50px);
		}

		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
