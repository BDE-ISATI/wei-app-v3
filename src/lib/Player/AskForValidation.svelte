<script>
	import { RequestType, requestData } from "../shared";
	import { Crypt, RSA } from "hybrid-crypto-js";

	export var players = [];
	var selected_player = null;
	export var defis = [];
	var selected_defi = null;

	var password;

	async function askForValidation() {
		var crypt = new Crypt();
		const key = await requestData(RequestType.generateEncryptionKey);

		const encrypted_password = await crypt.encrypt(key, password);
		


		requestData(RequestType.validateChallenge, encrypted_password, key, {
			validatedUserId: selected_player.id,
			validatedChallengeId: selected_defi.id,
		}).then((data) => {
			if (data == true) {
				alert("Challenge validé");
			} else {
				alert("Challenge non validé");
			}
		});
	}
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h3>Valider un défi</h3>
	</div>

	<form on:submit|preventDefault={askForValidation}>
		<div class="text">
			Joueur:
			<select bind:value={selected_player} required={true}>
				{#each players as p}
					<option value={p}>
						{p.name}
					</option>
				{/each}
			</select>
		</div>
		<div class="text">
			Défi:
			<select bind:value={selected_defi} required={true}>
				{#each defis as d}
					<option value={d}>
						{d.name}
					</option>
				{/each}
			</select>
		</div>
		<input
			type="password"
			placeholder="Mot de passe"
			required={true}
			bind:value={password}
		/>
		<button type="submit">Demander la validation</button>
	</form>
</div>

<style>
	.text {
		margin: 10px;
		margin-left: 15px;
	}

	.top {
		padding: 20px;
	}
</style>
