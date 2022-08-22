<script>
	import BottomBar from "./lib/BottomBar.svelte";
	import Defi from "./lib/Defis/Defi.svelte";
	import LoadingIcon from "./lib/LoadingIcon.svelte";
	import Player from "./lib/Scoreboard/Player.svelte";

	import { requestData, P, Perm, RequestType } from "./lib/shared.js";
	import AskForValidation from "./lib/Player/AskForValidation.svelte";
	import AskForCreation from "./lib/Player/AskForCreation.svelte";

	const isati_logo = "images/isati_logo.png";

	//Runtime var
	var pageActuelle = P.PAccueil;
	var defis = [];

	function loadDefi() {
		requestData(RequestType.getAllDefi).then(function (data) {
			defis = data;
		});
	}

	var classement = [];

	function loadClassement() {
		requestData(RequestType.getAllPlayers).then(function (data) {
			classement = data.sort(function (a, b) {
				return b.points - a.points;
			});
		});
	}

	loadDefi();
	loadClassement();
</script>

<main>
	<div class="center">
		<div class="app_center">
			{#if pageActuelle == P.PDefi}
				{#if defis.length != 0}
					{#each defis as _defi}
						<Defi
							name={_defi.name}
							id={_defi.id}
							description={_defi.description}
							points={_defi.points}
						/>
					{/each}
				{:else}
					<LoadingIcon />
				{/if}
			{:else if pageActuelle == P.PAccueil}
				<div class="welcomecard">
					<h3>Bienvenue sur le WEI 2022 de l'ESIR!</h3>
					<img class="logo" width=300 src={isati_logo} alt="Logo isati 2022" />
				</div>

				<AskForCreation />
				<AskForValidation bind:players={classement} bind:defis />
			{:else if classement.length != 0}
				{#each classement as _player}
					<Player username={_player.name} points={_player.points} imgUrl={_player.profilePictureUrl}/>
				{/each}
			{:else}
				<LoadingIcon />
			{/if}
			<div class="spacer" />
		</div>
		<BottomBar
			bind:state={pageActuelle}
			on:accueil_request={loadDefi && loadClassement}
			on:defi_request={loadDefi}
			on:scoreboard_request={loadClassement}
		/>
	</div>
</main>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

	:root {
		font-family: "Roboto", sans-serif;
		font-size: 5vw;
		color: rgb(34, 34, 34);
		background: linear-gradient(rgb(202, 214, 224), rgb(212, 237, 247));
	}

	@media only screen and (min-width: 450px) {
		:root {
			font-size: 20px;
		}
	}

	.center {
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	.app_center {
		height: 100%;
		width: 100%;
		display: block;
		max-width: 400px;
		align-content: center;
		text-align: center;
	}

	.spacer {
		height: 15vh;
	}

	.welcomecard {
		padding: 20px;
		margin: 20px;
	}

	.logo {
		size: 1em;
	}

	:global(.card) {
		margin-bottom: 1em;
		text-align: left;
		background-color: white;
		padding: 1em;
		border-radius: 0.8em;
	}

	:global(input),
	:global(button),
	:global(select) {
		border: none;
		border-bottom: 2px solid black;
		border-radius: 0.5em;
		padding: 0.5em;
		margin-bottom: 0.5em;
	}

	:global(input::-webkit-file-upload-button)
	{
		border: none;
		border-bottom: 2px solid black;
		border-radius: 0.5em;
		padding: 0.5em;
	}

	:global(input[type="file"]) {
		border: none;
	}
</style>
