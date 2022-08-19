<script>
	import { requestData, RequestType, Perm } from "../shared.js";

	export var validated_username = "";
	export var validated_password_encoded = "";

	var users = [];
	var defis = [];
	var selectedUser = null;
	var selectedDefi = null;

	function validateDefi() {
		requestData(RequestType.ValidateDefi, validated_username, validated_password_encoded, {
			defi: selectedDefi,
			player: selectedUser,
		}).then((data) => {
			if (data.success) {
				alert("Défi validé");
			} else {
				alert("Erreur: le défi n'a pas pu être validé");
			}
		});

		resetList();
	}

	function resetList() {
		selectedUser = null;
		selectedDefi = null;

		requestData(RequestType.GetDefi)
			.then((data) => {
				defis = data;
			})
			.then(() => {
				//We nest the requests so we avoid request bugs (idk why I have to do this)
				requestData(RequestType.GetAllUser).then((data) => {
					users = data.users;

                    //Filter so we can only validate defis for players
					users = users.filter((user) => user.perms == Perm.player);
				});
			});
	}
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h3>Valider un défi</h3>
	</div>
	<button on:click={resetList}>Actualiser</button>
	<form on:submit|preventDefault={validateDefi}>
		<div class="text">Joueur: {#if selectedUser}{selectedUser.points} points{:else}Aucun
			joueur sélectionné{/if}</div>
		<select required={true} bind:value={selectedUser}>
			{#each users as user}
				<option value={user}>
					{user.nickname}
				</option>
			{/each}
		</select>
		<div class="text">
			Défi: {#if selectedDefi}{selectedDefi.points} points{:else}Aucun
				défi sélectionné{/if}
		</div>
		<select required={true} bind:value={selectedDefi}>
			{#each defis as defi}
				<option value={defi}>
					{defi.name}
				</option>
			{/each}
		</select>
		<button type="submit">Valider le défi</button>
	</form>
</div>

<style>
	.top {
		padding: 1px;
		padding-left: 30px;
	}

	.text {
		margin: 10px;
		margin-left: 15px;
	}
</style>
