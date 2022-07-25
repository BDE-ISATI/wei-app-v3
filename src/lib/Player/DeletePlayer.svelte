<script>
	import { requestData, RequestType } from "../shared.js";

	export var validated_username = "";
	export var validated_password_encoded = "";

	var usertodel = "";

	function deleteJoueur() {
		requestData(
			RequestType.DeleteUser,
			validated_username,
			validated_password_encoded,
			{
				username: usertodel,
			}
		).then((data) => {
			if (data.success) {
				alert("Joueur supprimé");
				usertodel = "";
			} else {
				alert(
					"Erreur: le joueur n'a pas pu être supprimé; vérifiez l'identifiant"
				);
			}
		});
	}
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h3>Supprimer un joueur</h3>
	</div>
	<form on:submit|preventDefault={deleteJoueur}>
		<input
			bind:value={usertodel}
			required={true}
			placeholder="identifiant"
		/>
		<button type="submit">Supprimer un utilisateur</button>
	</form>
</div>

<style>
	.top {
		padding: 1px;
		padding-left: 30px;
	}

	input {
		font-family: inherit;
		font-size: inherit;
		padding: 10px;
		margin: 10px;
		border-radius: 10px;
		border-width: 0px;

		box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2);
	}
</style>
