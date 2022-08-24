<script>
	export var name = "Nom du défi";
	export var description = "Lorem ipsum doloret sit amet";
	export var points = -1;
	export var image;
</script>

<div class="card">
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src={image} class="user_pfp" alt="Photo du défi" />
	<h3 class="titre">{name} - {points} points</h3>
	<p class="description">{description}</p>
</div>

<style>
	img {
		width: 5em;
		height: 5em;
		border-radius: 50%;
		object-fit: cover;
		grid-column: 1;
		grid-row: 1 / 3;
	}

	.description {
		grid-column: 2;
		grid-row: 2;
		margin: auto;
		margin-left: 1em;
	}

	.titre {
		grid-column: 2;
		grid-row: 1;
		margin: auto;
		margin-left: 1em;
	}

	.card {
		display: grid;
		grid-template-columns: auto auto;
		grid-template-rows: auto auto;
	}

	p {
		margin: auto;
		margin-left: 1em;
	}
</style>
