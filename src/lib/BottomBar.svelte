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
	function setState(desired) {
		state = desired;
	}
</script>

<div class="bottombar">
	<button
		on:click={() => {
			state = P.PAccueil;
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
		background: var(--main-color);
		box-shadow: 0px 0px 15px gray;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: minmax(7vh, auto);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}

	button {
		font-family: inherit;
		font-weight: bolder;
		font-size: inherit;
		color: white;
		background-color: rgba(0, 0, 0, 0);
		border: 0px;
		text-shadow: 0px 0px 5px black;
		box-shadow: none;

		transition-duration: 500ms;
	}

	button:hover {
		box-shadow: none;
	}
</style>
