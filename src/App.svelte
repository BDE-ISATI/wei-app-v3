<script>
	import BottomBar from "./lib/BottomBar.svelte";
	import Defi from "./lib/Defis/Defi.svelte";
	import LoadingIcon from "./lib/LoadingIcon.svelte";
	import Player from "./lib/Scoreboard/Player.svelte";

	import { requestData, P, Perm, RequestType } from "./lib/shared.js";
	import AskForValidation from "./lib/Player/AskForValidation.svelte";

	//Runtime var
	var pageActuelle = P.PDefi;
	var defis = [];

	function loadDefi() {
		requestData(RequestType.getAllDefi).then(function (data) {
			defis = data;
		});
	}
	loadDefi();

	var classement = [];

	function loadClassement() {
		requestData(RequestType.getAllPlayers).then(function (data) {
			classement = data.sort(function (a, b) {
				return b.points - a.points;
			});
		});
	}
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
				<AskForValidation bind:players={classement} bind:defis />
			{:else if classement.length != 0}
				{#each classement as _player}
					<Player username={_player.name} points={_player.points} />
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

<svelte:head>
	<!--<link href="http://fonts.cdnfonts.com/css/cascadia-code" rel="stylesheet" />-->
</svelte:head>

<style>
	@import url("https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/cascadia-code.min.css");

	:root {
		font-family: "Cascadia Code", sans-serif;
		font-size: 5vw;
		color: rgb(34, 34, 34);
		/*--main-color: linear-gradient(rgb(255, 175, 99), #e94545);*/
		--main-color: #e94545;
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
		height: 20vh;
	}

	/*card stuff*/
	:global(.top) {
		padding: 30px;
		background: var(--main-color);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		color: white;
	}

	:global(.card) {
		margin-top: 10px;
		border-radius: 20px;
		box-shadow: 0px 0px 15px rgb(202, 202, 202);
		transition: 0.2s;
		position: relative;
		text-align: left;
	}

	:global(.card:before) {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		border-radius: 20px;
		box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.7);

		pointer-events: none;
	}

	:global(.card:hover) {
		box-shadow: 0px 0px 15px gray;
	}

	:global(button) {
		font-family: inherit;
		font-size: inherit;
		position: relative;
		padding: 10px;
		margin: 10px;
		border-radius: 10px;
		border-width: 0px;
		background-color: white;

		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

		transition-duration: 500ms;
	}

	:global(input) {
		font-family: inherit;
		font-size: inherit;
		position: relative;
		padding: 10px;
		margin: 10px;
		border-radius: 10px;
		border-width: 0px;
		background-color: white;

		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

		transition-duration: 500ms;
	}

	:global(button:hover) {
		box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2);
	}

	:global(select) {
		font-family: inherit;
		font-size: inherit;
		padding: 10px;
		margin: 10px;
		border-radius: 10px;
		border-width: 0px;

		box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2);
	}
</style>
