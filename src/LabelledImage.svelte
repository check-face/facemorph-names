<script>
    export let value = "asdf";
    export let dim = 200;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function imageClicked() {
        dispatch('imageClicked', value);
    }

    import { imageSrc } from "./checkface";
    $: src = imageSrc(dim, value);
</script>

<div on:click={imageClicked}>
    <img
        loading="lazy"
        width={dim}
        height={dim}
        {src}
        alt={value}
    />
    <p>{value}</p>
</div>

<style>
    div {
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
