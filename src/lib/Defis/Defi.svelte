<script>
	export var name = "Nom du défi";
	export var id = "id_du_defi";
	export var description = "Lorem ipsum doloret sit amet";
	export var points = -1;
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h3>{name} - {points < 0 ? "à définir" : points}</h3>
	</div>
	<p class="description">{description} - id:{id}</p>
</div>

<style>
	.description {
		padding: 20px;
		padding-top: 5px;
	}
</style>
