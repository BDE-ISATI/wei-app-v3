<script>
	import { readFileAsync, requestData, RequestType } from "../shared";

	export var players = [];
	var selected_player_name = null;
	var selected_player;
	export var defis = [];
	var selected_defi_name = null;
	var selected_defi;

	var files;

	async function askForValidation() {
		updateSelection();
		const image = (await readFileAsync(files[0])).replace(
			/^data:image\/[a-z]+;base64,/,
			""
		);

		if (new Blob([image]).size / 1e6 > 10) {
			alert("Image trop grosse! (dois faire moins de 10Mb)");
			return;
		}

		//Si l'utilisateur a mal choisi, envoie la requète pour sa team
		if (selected_player.isTeam != selected_defi.teamOnly) {
			selected_player = players.filter(
				(player) => player.name == selected_player.teamId
			)[0];
		}

		const result = await requestData(RequestType.validateChallenge, {
			validatedUserId: selected_player.id,
			validatedChallengeId: selected_defi.id,
			validatedChallengeImage: image,
		});

		if (result) {
			alert("Requête envoyée");
		} else {
			alert("Erreur lors de l'envoi de la requête");
		}
	}

	async function updateSelection() {
		//We find the player based on the name we selected
		selected_player = players.filter(
			(player) => player.name == selected_player_name
		)[0];
		//Same for the defi
		selected_defi = defis.filter(
			(player) => player.name == selected_defi_name
		)[0];
	}
</script>

<div class="card">
	<div class="card-header">
		<h3>Valider un défi</h3>
	</div>

	<form on:submit|preventDefault={askForValidation}>
		<p>Joueur:</p>
		<input
			bind:value={selected_player_name}
			on:change={updateSelection}
			required={true}
			list="playerlist"
		/>
		<datalist required={true} id="playerlist">
			{#each players as p}
				<option value={p.name} />
			{/each}
		</datalist>
		<p>Défi:</p>
		<input
			bind:value={selected_defi_name}
			on:change={updateSelection}
			required={true}
			list="defilist"
		/>
		<datalist required={true} id="defilist">
			{#each defis.filter(x => x.actif) as d}
				<option value={d.name} />
			{/each}
		</datalist>
		<p>Photo:</p>
		<input
			type="file"
			accept="image/png, image/jpeg"
			bind:files
			required={true}
		/>
		<button class="large" type="submit">Demander la validation</button>
	</form>
</div>

<style>
</style>
