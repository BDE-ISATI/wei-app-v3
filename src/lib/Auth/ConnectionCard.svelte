<script>
	import { requestData, Perm, RequestType } from "../shared.js";

	//Those are bound to the main app. This card just makes sure the user/pass combo is valid, and then gives it
	export var validated_username = "";
	export var validated_password_encoded = "";
	export var validated_perm = Perm.none;

	//Not meant to be seen, those are temporary as they are not validated yet.
	var username = "";
	var password = "";

	function connect() {
		requestData(RequestType.GetUserAuth, username, password).then(
			(data) => {
				if (data.auth) {
					validated_username = username;
					validated_password_encoded = password;
				}
			}
		);

		requestData(RequestType.GetUserPerm, username).then((data) => {
			if (data.perms) validated_perm = data.perms;
		});
	}
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h3>Connexion</h3>
	</div>
	<form on:submit|preventDefault={connect}>
		<input bind:value={username} placeholder="identifiant" />
		<input
			type="password"
			bind:value={password}
			placeholder="Mot de passe"
		/>
		<button type="submit">Se connecter</button>
	</form>
</div>

<style>
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
