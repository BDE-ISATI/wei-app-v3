<script>
	export var name = "";
	export var points = 0;
	export var imgUrl = "https://i.imgur.com/poJVcio.png";
</script>

<div class="card">
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src={imgUrl} class="user_pfp" alt="Photo de profil" />
	<p class="description">{name}<br>{points} points</p>
</div>

<style>
	img {
		width: 5em;
		height: 5em;
		border-radius: 50%;
		object-fit: cover;
		grid-column: 1;
		grid-row: 1;
		margin: auto;
		margin-left: 0px;
	}

	.description {
		grid-column: 2;
		grid-row: 1;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 1em;
	}

	.card {
		display: grid;
		grid-template-columns: 5em auto;
		grid-template-rows: 5em;
	}

	p {
		margin: auto;
		margin-left: 1em;
	}
</style>
