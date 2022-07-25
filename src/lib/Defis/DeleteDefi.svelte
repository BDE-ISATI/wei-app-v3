<script>
	import { requestData, RequestType } from "../shared.js";

	export var validated_username = "";
	export var validated_password_encoded = "";

	var id = "";

	function deleteDefi() {
		requestData(
			RequestType.DeleteDefi,
			validated_username,
			validated_password_encoded,
			{ id: id }
		).then((data) => {
			if (data.success) {
				alert("Défi supprimé");
				id = "";
			} else {
				alert(
					"Erreur: impossible de supprimer le défi; vérifiez l'id?"
				);
			}
		});
	}
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h3>Supprimer un défi</h3>
	</div>
	<form on:submit|preventDefault={deleteDefi}>
		<input bind:value={id} required={true} placeholder="id_du_defi" />
		<button type="submit">Supprimer</button>
	</form>
</div>

<style>
	.card {
		margin-top: 10px;
	}

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
