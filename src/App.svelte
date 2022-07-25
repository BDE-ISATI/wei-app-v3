<script>
	import BottomBar from "./lib/BottomBar.svelte";
	import ConnectionCard from "./lib/Auth/ConnectionCard.svelte";
	import CreateDefi from "./lib/Defis/CreateDefi.svelte";
	import Defi from "./lib/Defis/Defi.svelte";
	import DeleteDefi from "./lib/Defis/DeleteDefi.svelte";
	import Disconnect from "./lib/Auth/Disconnect.svelte";
	import LoadingIcon from "./lib/LoadingIcon.svelte";
	import Player from "./lib/Scoreboard/Player.svelte";
	import CreatePlayer from "./lib/Player/CreatePlayer.svelte";
	import DeletePlayer from "./lib/Player/DeletePlayer.svelte";

	import { requestData, P, Perm, RequestType } from "./lib/shared.js";
	import ValidateDefi from "./lib/Defis/ValidateDefi.svelte";

	//Runtime var
	var pageActuelle = P.PDefi;
	var defis = [];
	var validated_username = "";
	var validated_password_encoded = "";
	var validated_perm = Perm.none;

	function loadDefi() {
		requestData(RequestType.GetDefi).then(function (data) {
			defis = data;
		});
	}
	loadDefi();

	var classement = [];

	function loadClassement() {
		requestData(RequestType.GetAllUser).then(function (data) {
			classement = data.users.sort(function (a, b) {
				return b.points - a.points;
			});

			classement = classement.filter((user) => user.perms == Perm.player);
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
				{#if validated_username === "" && validated_password_encoded === ""}
					<ConnectionCard
						bind:validated_username
						bind:validated_password_encoded
						bind:validated_perm
					/>
				{:else}
					<Disconnect
						bind:validated_username
						bind:validated_password_encoded
					/>
					{#if validated_perm >= Perm.manager}
						<ValidateDefi
							bind:validated_username
							bind:validated_password_encoded
						/>
						<CreateDefi
							bind:validated_username
							bind:validated_password_encoded
						/>
						<DeleteDefi
							bind:validated_username
							bind:validated_password_encoded
						/>
						<CreatePlayer
							bind:validated_username
							bind:validated_password_encoded
						/>
						<DeletePlayer
							bind:validated_username
							bind:validated_password_encoded
						/>
					{/if}
				{/if}
			{:else if classement.length != 0}
				{#each classement as _player}
					<Player
						username={_player.nickname}
						points={_player.points}
					/>
				{/each}
			{:else}
				<LoadingIcon />
			{/if}
			<div class="spacer" />
		</div>
		<BottomBar
			bind:state={pageActuelle}
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
