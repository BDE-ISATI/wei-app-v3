<script>
	import { readFileAsync, requestData, RequestType } from "../shared";

    var pseudo = "";
	var files;

	async function askForCreation() {
		const image = (await readFileAsync(files[0])).replace(/^data:image\/[a-z]+;base64,/, "");

		const result = await requestData(
			RequestType.createPlayer,
			{
				createdUserUsername: pseudo,
				createdUserProfilePicture: image,
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
		<h3>Créer son compte</h3>
	</div>

	<form on:submit|preventDefault={askForCreation}>
		<div>
			<input type="text" required={true} bind:value={pseudo} pattern="[A-Za-z '0-9]*" placeholder="Ton pseudo">
		</div>
		<div>
			Photo:
			<input
				type="file"
				accept="image/png, image/jpeg"
				bind:files
				required={true}
			/>
		</div>
		<button type="submit">Demander son compte</button>
	</form>
</div>

<style>
</style>
