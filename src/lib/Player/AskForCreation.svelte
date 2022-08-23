<script>
	import { P, readFileAsync, requestData, RequestType } from "../shared";

	var pseudo = "";
	var files;

	async function askForCreation() {
		const image = (await readFileAsync(files[0])).replace(
			/^data:image\/[a-z]+;base64,/,
			""
		);

if (new Blob([image]).size / 1e+6) {
	alert("Image trop grosse! (dois faire moins de 10Mb)");
	return;
}

		const result = await requestData(RequestType.createPlayer, {
			createdUserUsername: pseudo,
			createdUserProfilePicture: image,
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
