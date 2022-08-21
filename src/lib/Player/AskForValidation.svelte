<script>
	import { requestData, RequestType, requestWithAuth } from "../shared";

	export var players = [];
	var selected_player = null;
	export var defis = [];
	var selected_defi = null;

	async function askForValidation() {
		const result = await requestData(
			RequestType.validateChallenge,
			null,
			null,
			{
				validatedUserId: selected_player.id,
				validatedChallengeId: selected_defi.id,
			}
		);

		if (result) {
			alert("Requête envoyée");
		} else {
			alert("Erreur lors de l'envoi de la requête");
		}
	}
</script>

<div class="card">
	<div class="card-header">
		<h3>Valider un défi</h3>
	</div>

	<form on:submit|preventDefault={askForValidation}>
		<div class="text">
			Joueur:
			<select class="list-group" bind:value={selected_player} required={true}>
				{#each players as p}
					<option class="list-group-item" value={p}>
						{p.name}
					</option>
				{/each}
			</select>
		</div>
		<div class="text">
			Défi:
			<select class="list-group" bind:value={selected_defi} required={true}>
				{#each defis as d}
					<option class="list-group-item" value={d}>
						{d.name}
					</option>
				{/each}
			</select>
		</div>
		<button type="submit">Demander la validation</button>
	</form>
</div>

<style>
</style>
