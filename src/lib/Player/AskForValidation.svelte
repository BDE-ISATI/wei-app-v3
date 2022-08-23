<script>
	import { readFileAsync, requestData, RequestType } from "../shared";

	export var players = [];
	var selected_player = null;
	export var defis = [];
	var selected_defi = null;

	var files;

	async function askForValidation() {
		const image = (await readFileAsync(files[0])).replace(
			/^data:image\/[a-z]+;base64,/,
			""
		);

		if (new Blob([image]).size / 1e+6) {
			alert("Image trop grosse! (dois faire moins de 10Mb)");
			return;
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
</script>

<div class="card">
	<div class="card-header">
		<h3>Valider un défi</h3>
	</div>

	<form on:submit|preventDefault={askForValidation}>
		<p>Joueur:</p>
		<select class="list-group" bind:value={selected_player} required={true}>
			{#each players as p}
				<option class="list-group-item" value={p}>
					{p.name}
				</option>
			{/each}
		</select>
		<p>Défi:</p>
		<select class="list-group" bind:value={selected_defi} required={true}>
			{#each defis as d}
				<option class="list-group-item" value={d}>
					{d.name}
				</option>
			{/each}
		</select>
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
