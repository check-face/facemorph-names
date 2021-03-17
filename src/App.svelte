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
			let url = checkface.facemorph(selectedValue, event.detail.value);
			if(event.detail.event.ctrlKey) {
				window.open(url);
			}
			else {
				window.location.href = url;
			}
		} else {
			selectedValue = event.detail.value;
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
			dim="200"
			value={selectedValue}
			hasX
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
