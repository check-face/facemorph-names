<script>
    export let value = "asdf";
    export let dim = 200;
    export let hasX = false;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function imageClicked(event) {
        dispatch("imageClicked", { value, event });
    }

    import { imageSrc } from "./checkface";
    $: src = imageSrc(dim, value);
</script>

<button on:click={imageClicked} class:X={hasX}>
    <img loading="lazy" width={dim} height={dim} {src} alt={value} />
    <p>{value}</p>
    <div class="check X" />
</button>

<style>
    button {
        outline: none;
        border: none;
        margin: 0;
        padding: 0;
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        outline: solid 3px cornflowerblue;
        z-index: 2;
    }

    button:focus-within {
        outline: solid 3px blue;
        z-index: 2;
    }

    button.X::before {
        font-size: 10em;
    }

    
    button.X::before,
    button.X::before,
    .X .check::before {
        position: absolute;
        content: "X";
        color: rgba(255, 255, 255, 0.726);
        font-family: Arial, sans-serif;
        text-shadow: 2px 2px black;
        font-family: sans-serif;
        
        pointer-events: none;
    }

    button.X::before,
    button.X::before {
        opacity: 0;
		transform: rotate(-90deg);
		transition: opacity 0.2s, transform 0.2s;
    }

    button.X:hover::before,
    button.X:focus-within::before {
        opacity: 1;
		transform: rotate(0);
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

    .check {
        display: none;
    }

    @media not all and (hover: hover) {
        .check {
            outline: solid 2px rgba(255, 255, 255, 0.726);

            position: absolute;
            bottom: 5px;
            left: 5px;
            width: 15px;
            height: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
