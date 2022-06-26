<script>
    import { createEventDispatcher } from "svelte";

	const P = {
		PAccueil: "Accueil",
		PDefi: "Défis",
		PClassement: "Classement",
	};

	export var state = P.PAccueil;

	let dispatch = createEventDispatcher();
	function defi_request() {
		dispatch("defi_request");
	}

	function setState(desired) {
		state = desired;
	}
</script>

<div class="bottombar">
	<button on:click={() => {state = P.PAccueil} }>Accueil</button>
	<button on:click={() => {state = P.PDefi; defi_request();}}>Défis</button>
	<button on:click={() => {state = P.PClassement}}>Classement</button>
</div>

<style>
	.bottombar {
		overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 8vh;
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.466));
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: minmax(7vh, auto);
	}

	button {
		font-family: inherit;
		font-weight: bolder;
		font-size: inherit;
		color: white;
		background-color: rgba(0, 0, 0, 0);
		border: 0px;
		text-shadow: 0px 0px 5px black;
		padding-bottom: 5vw;
		padding-left: 0;
		padding-right: 0;
	}
</style>
