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

	/*
	button {
		font-family: inherit;
		font-weight: inherit;
		font-size: inherit;
		background-color: rgba(0, 0, 0, 0);
		border: 0px;
		box-shadow: none;

		transition-duration: 500ms;
	}*/
</style>
