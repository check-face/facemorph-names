<script>
// import VirtualList from '@sveltejs/svelte-virtual-list';
import VirtualList from './VirtualList.svelte';
import SvelteInfiniteScroll from "svelte-infinite-scroll";
import ImageGrid from './ImageGrid.svelte'
import names from './babynames.js'


function chunk(arr, chunkSize) {
	var R = [];
	for (var i=0,len=arr.length; i<len; i+=chunkSize)
    R.push(arr.slice(i,i+chunkSize));
	return R;
}

let chunks = chunk(names.map(name => name.toLowerCase()), 24)

let size = 2
let page = 2
let virtualList

let items = chunks.splice(0, page * size);
$: items = [
	...items,
	...chunks.slice(page * size, size * (page + 1))
]

function loadMore() {
	console.log("loadmore")
	page += 1;
}
</script>
<VirtualList bind:viewport={virtualList} items={items} let:item>

<ImageGrid values={item}></ImageGrid>
</VirtualList>
<SvelteInfiniteScroll threshold={100} elementScroll={virtualList} on:loadMore={loadMore} />
