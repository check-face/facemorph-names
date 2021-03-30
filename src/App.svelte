<script>
	// import VirtualList from '@sveltejs/svelte-virtual-list';
	import VirtualList from "./VirtualList.svelte";
	import SvelteInfiniteScroll from "svelte-infinite-scroll";
	import ImageGrid from "./ImageGrid.svelte";
	import LabelledImageButton from "./LabelledImageButton.svelte";
	import names from "./babynames.js";
	import * as checkface from "./checkface";
	import { scale } from 'svelte/transition';

	function chunk(arr, chunkSize) {
		var R = [];
		for (var i = 0, len = arr.length; i < len; i += chunkSize)
			R.push(arr.slice(i, i + chunkSize));
		return R;
	}

	function getChunkSize(width, imageDim) {
		let n = Math.floor(width / imageDim);
		if(!(24 % n)) return 24;
		else return 3 * n;
	}

	const dim = 200;
	let gridWidth = 0; //bind to VirtualList viewportWidth
	$: chunkSize = getChunkSize(gridWidth, dim);
	$: chunks = chunk(
		names.map((name) => name.toLowerCase()),
		chunkSize
	);

	let size = 2;
	let page = 2;
	let virtualList;

	$: items = chunks.slice(0, size * (page + 1));

	function loadMore() {
		console.log("loadmore");
		page += 1;
	}

	let selectedValue = null;

	function imageClicked(event) {
		let clickedValue = event.detail.value
		const targetOrigin = "*"
		window.parent.postMessage({ "value": clickedValue }, targetOrigin) // When in iframe allows any origin see what names you click
		if (selectedValue !== null) {
			let url = checkface.facemorph(selectedValue, clickedValue);
			if(event.detail.event.ctrlKey) {
				window.open(url);
			}
			else {
				window.location.href = url;
			}
		} else {
			selectedValue = clickedValue;
		}
	}

	function selectedImageClicked() {
		selectedValue = null;
	}

	function windowKeyDown(event) {
		if(event.key === "Escape") {
			selectedValue = null;
		}
	}
</script>

<svelte:window on:keydown={windowKeyDown}/>

{#if selectedValue !== null}
	<div class="selected-image" out:scale={{ duration: 400 }}>
		<LabelledImageButton
			{dim}
			value={selectedValue}
			hasX
			on:imageClicked={selectedImageClicked}
		/>
	</div>
{/if}
<VirtualList bind:viewport={virtualList} bind:viewportWidth={gridWidth} {items} let:item>
	<ImageGrid values={item} on:imageClicked={imageClicked} {dim} />
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
		box-shadow: 4px 5px 8px rgb(0 0 0 / 80%);
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
