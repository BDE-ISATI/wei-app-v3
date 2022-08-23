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
	function scoreboard_request() {
		dispatch("scoreboard_request");
	}
	function accueil_request() {
		dispatch("accueil_request");
	}
	function setState(desired) {
		state = desired;
	}
</script>

<div class="bottombar">
	<button
		on:click={() => {
			state = P.PAccueil;
			accueil_request();
		}}>Accueil</button
	>
	<button
		on:click={() => {
			state = P.PDefi;
			defi_request();
		}}>Défis</button
	>
	<button
		on:click={() => {
			state = P.PClassement;
			scoreboard_request();
		}}>Classement</button
	>
</div>

<style>
	.bottombar {
		overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 8vh;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	
	button {
		font-weight: 600;
		font-size: 1em;
		border-radius: 0;
		margin: 0;
		padding: auto;
		background-color: white;
	}

	button:active {
		background-color: rgb(219, 219, 219);
	}
</style>
