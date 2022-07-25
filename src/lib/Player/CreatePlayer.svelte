<script>
	import { requestData, RequestType, Perm } from "../shared.js";

	export var validated_username = "";
	export var validated_password_encoded = "";

	var username = "";
	var nickname = "";
	var password = "";
	var selected = Perm.player;

	function createJoueur() {
		requestData(
			RequestType.CreateUser,
			validated_username,
			validated_password_encoded,
			{
				username: username,
				nickname: nickname,
				perms: selected,
				password: password,
			}
		).then((data) => {
			if (data.success) {
				alert("Joueur créé");
				username = "";
				nickname = "";
				password = "";
				selected = Perm.player;
			} else {
				alert(
					"Erreur: le joueur n'a pas pu être créé; existe-t-il déjà ?"
				);
			}
		});
	}

	var permToText = [];
	permToText[Perm.player] = "Joueur";
	permToText[Perm.all] = "Administrateur";
	permToText[Perm.manager] = "Manager";
	permToText[Perm.none] = "Aucun";
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h3>Creer un joueur</h3>
	</div>
	<form on:submit|preventDefault={createJoueur}>
		<input
			bind:value={username}
			required={true}
			placeholder="identifiant (pas de caractères spéciaux)"
		/>
		<input
			bind:value={nickname}
			required={true}
			placeholder="Pseudo affiché"
		/>
		<input
			type="password"
			bind:value={password}
			required={true}
			placeholder="Mot de passe"
		/>
		<select bind:value={selected} required={true}>
			{#each Object.keys(Perm) as p}
				<option value={Perm[p]}>
					{permToText[Perm[p]]}
				</option>
			{/each}
		</select>
		<button type="submit">Créer utilisateur</button>
	</form>
</div>

<style>
	.top {
		padding: 1px;
		padding-left: 30px;

		/*pointer-events: none;*/
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
