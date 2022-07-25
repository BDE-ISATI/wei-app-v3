<script>
	import { requestData, RequestType } from "../shared";

	export var validated_username = "";
	export var validated_password_encoded = "";

	var name = "";
	var id = "";
	var description = "";
	var points = 0;

	function updateId() {
		id = name
			.split(" ")
			.join("_")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
	}

	function createDefi() {
		requestData(
			RequestType.CreateDefi,
			validated_username,
			validated_password_encoded,
			{
				name: name,
				id: id,
				description: description,
				points: points,
			}
		).then((data) => {
			if (data.success) {
				alert("Défi créé");
				name = "";
				id = "";
				description = "";
				points = 0;
			} else {
				alert(
					"Erreur: le défi n'a pas pu être créé; existe-t-il déjà ?"
				);
			}
		});
	}
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h3>Creer un défi</h3>
	</div>
	<form on:submit|preventDefault={createDefi}>
		<input
			bind:value={name}
			on:input={updateId}
			required={true}
			placeholder="Nom du défi"
		/>
		<input disabled={true} bind:value={id} />
		<input
			bind:value={description}
			required={true}
			placeholder="Description"
		/>
		<input type="number" bind:value={points} required={true} />
		<button type="submit">Creer</button>
	</form>
</div>

<style>
	.card {
		margin-top: 10px;
	}

	.top {
		padding: 1px;
		padding-left: 30px;

		pointer-events: none;
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
