<script>
	import BottomBar from "./lib/BottomBar.svelte";
	import Defi from "./lib/Defis/Defi.svelte";
	import LoadingIcon from "./lib/LoadingIcon.svelte";
	import Player from "./lib/Scoreboard/Player.svelte";

	import { requestData, P, RequestType } from "./lib/shared.js";
	import AskForValidation from "./lib/Player/AskForValidation.svelte";
	import AskForCreation from "./lib/Player/AskForCreation.svelte";
	import ClassementSelector from "./lib/ClassementSelector.svelte";
	import Team from "./lib/Scoreboard/Team.svelte";
	import Inspector from "./lib/Inspector.svelte";

	const isati_logo = "images/isati_logo300px.png";

	//Choisis la page affichée
	var pageActuelle = P.PClassement;

	//Choisis quel type de classement est affiché
	var isshowingjoueur = true;

	//Infos
	var defis = [];

	function loadDefi() {
		requestData(RequestType.getAllDefi).then(function (data) {
			defis = data;
		});
	}

	var classement = [];

	function loadClassement() {
		requestData(RequestType.getAllPlayers).then(function (data) {
			classement = data;
		});
	}

	var equipes = [];

	function loadTeams() {
		requestData(RequestType.getAllTeams).then(function (data) {
			equipes = data;
		});
	}

	loadDefi();
	loadClassement();
	loadTeams();

	var isScrollButtonHidden = false;
	window.onscroll = () => {
		isScrollButtonHidden = !(window.scrollY > 0);
	};

	var selectedPlayerInspector = null;
	function openProfileInspector(player) {
		console.log(player.detail);
		selectedPlayerInspector = player.detail;
	}
</script>

<main>
	<button
		class="go_to_top"
		data-ishidden={isScrollButtonHidden}
		on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>Retourner en haut</button
	>
	<div class="center">
		<div class="app_center">
			{#if pageActuelle == P.PDefi}
				{#if defis.length != 0}
					{#each defis.filter(x => x.actif).sort(function (a, b) {
						return b.points - a.points;
					}) as _defi}
						<Defi
							name={_defi.name}
							description={_defi.description}
							points={_defi.points}
							image={_defi.image}
							isTeam={_defi.teamOnly}
						/>
					{/each}
				{:else}
					<LoadingIcon />
				{/if}
			{:else if pageActuelle == P.PAccueil}
				<div class="welcomecard">
					<h3>Bienvenue sur le WEI 2022 de l'ESIR!</h3>
					<img
						class="logo"
						width="300"
						src={isati_logo}
						alt="Logo isati 2022"
					/>
				</div>

				<AskForCreation bind:teams={equipes} />
				<AskForValidation bind:players={classement} bind:defis />
			{:else if classement.length != 0}
				<ClassementSelector bind:showingJoueurs={isshowingjoueur} />
				{#if isshowingjoueur}
					{#each classement
						.sort(function (a, b) {
							return b.points - a.points;
						})
						.filter((x) => !x.isTeam) as _player}
						<Player
							player={_player}
							on:clicked_profile={openProfileInspector}
						/>
					{/each}
				{:else}
					{#each equipes.sort(function (a, b) {
						return b.points - a.points;
					}) as _equipe}
						<Team
							name={_equipe.teamName}
							points={_equipe.points}
							imgUrl={_equipe.teamImageUrl}
						/>
					{/each}
				{/if}
			{:else}
				<LoadingIcon />
			{/if}
			<div class="spacer" />
		</div>
		<BottomBar
			bind:state={pageActuelle}
			on:accueil_request={() => {
				loadClassement();
				loadTeams();
				loadDefi();
				window.scrollTo({ top: 0, behavior: "smooth" });
			}}
			on:defi_request={() => {
				loadDefi();
				window.scrollTo({ top: 0, behavior: "smooth" });
			}}
			on:scoreboard_request={() => {
				loadClassement();
				loadTeams();
				window.scrollTo({ top: 0, behavior: "smooth" });
			}}
		/>
	</div>
	{#if selectedPlayerInspector != null}
		<Inspector bind:player={selectedPlayerInspector} challenges={defis}/>
	{/if}
</main>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

	:root {
		font-family: "Roboto", sans-serif;
		color: rgb(34, 34, 34);
		background: linear-gradient(rgb(202, 214, 224), rgb(212, 237, 247));
		background-attachment: fixed;
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

	.go_to_top {
		position: fixed;
		overflow: hidden;
		right: 10%;
		box-shadow: 0px 0px 10px black;
		transition-duration: 300ms;
		transition-timing-function: cubic-bezier(0.15, 0.01, 0, 1);
	}

	.go_to_top[data-ishidden="true"] {
		bottom: -10%;
	}

	.go_to_top[data-ishidden="false"] {
		bottom: 10%;
	}

	:global(.card) {
		margin-bottom: 1em;
		text-align: left;
		background-color: white;
		padding: 1em;
		border-radius: 0.8em;
	}

	/*
	 forms
	*/
	:global(input),
	:global(button),
	:global(select) {
		border: none;
		border-bottom: 2px solid black;
		border-radius: 0.5em;
		padding: 0.5em;
		margin-top: auto;
		margin-bottom: auto;
		background-color: rgb(233, 233, 233);
		transition-duration: 400ms;
	}

	:global(input:hover),
	:global(button:hover),
	:global(select:hover) {
		background-color: white;
	}

	:global(input::-webkit-file-upload-button) {
		display: none;
	}

	:global(form) {
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	:global(.large) {
		grid-column: 1 / 3;
	}

	:global(p) {
		font-size: 1em;
	}
</style>
