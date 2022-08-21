<script>
	import { requestData, RequestType, requestWithAuth } from "../shared";

    var pseudo = "";

	async function askForCreation() {
		const result = await requestData(
			RequestType.createPlayer,
			null,
			null,
			{
				createdUserUsername: pseudo,
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
		<div class="text">
			<input type="text" required={true} bind:value={pseudo} pattern="[A-Za-z '0-9]*" placeholder="Ton pseudo">
		</div>
		<button type="submit">Demander son compte</button>
	</form>
</div>

<style>
</style>
