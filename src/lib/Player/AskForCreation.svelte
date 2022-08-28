<script>
	import { P, readFileAsync, requestData, RequestType } from "../shared";

	export var teams = [];
	var selectedTeamName;
	var pseudo = "";
	var files;

	async function askForCreation() {
		const image = (await readFileAsync(files[0])).replace(
			/^data:image\/[a-z]+;base64,/,
			""
		);

		if (new Blob([image]).size / 1e6 > 10) {
			alert("Image trop grosse! (dois faire moins de 10Mb)");
			return;
		}

		//Removing unwanted spaces
		pseudo = pseudo.replace(/\s+/g, ' ').trim();

		var selectedTeam = teams.filter(team => team.teamName == selectedTeamName)[0];

		const result = await requestData(RequestType.createPlayer, {
			createdUserUsername: pseudo,
			createdUserProfilePicture: image,
			createdUserTeam: selectedTeam.teamId,
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
		<h3>Créer son compte</h3>
	</div>

	<form on:submit|preventDefault={askForCreation}>
		<input
			type="text"
			class="large"
			required={true}
			bind:value={pseudo}
			pattern="[A-Za-z '0-9]*"
			placeholder="Ton pseudo"
		/>
		<p>Équipe:</p>
		<input bind:value={selectedTeamName} required={true} list="teamList">
		<datalist required={true} id="teamList">
			{#each teams as t}
				<option value={t.teamName}/>
			{/each}
		</datalist>
		<p>Photo:</p>
		<input
			type="file"
			accept="image/png, image/jpeg"
			bind:files
			required={true}
		/>
		<button class="large" type="submit">Demander son compte</button>
	</form>
</div>

<style>
</style>
