<script>
	export var validated_username = "";
	export var validated_password_encoded = "";

	function disconnect() {
		validated_username = "";
		validated_password_encoded = "";
	}
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h3><b>Mon compte: {validated_username}</b></h3>
	</div>
	<button type="button" on:click={disconnect}>Se deconnecter</button>
</div>

<style>

	.top {
		padding: 1px;
		padding-left: 30px;
	}
</style>
