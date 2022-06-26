<script>
	export var name = "Nom du défi";
	export var description = "Lorem ipsum doloret sit amet";
	export var points = -1;
</script>

<div class="card">
	<div class="card_overshadow" />
	<div class="top">
		<h2><b>{name} - {points < 0 ? "à définir" : points}</b></h2>
	</div>
	<p class="description">{description}</p>
</div>

<style>
	.card {
		border-radius: 20px;
		box-shadow: 0px 0px 15px rgb(202, 202, 202);
		transition: 0.2s;
		position: relative;
	}

	.card:before {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		
		border-radius: 20px;
		box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.7);
	}

	.card:hover {
		box-shadow: 0px 0px 15px gray;
	}

	.top {
		padding: 30px;
		background: linear-gradient(rgb(255, 175, 99), rgb(255, 70, 70));
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}

	.description {
		padding: 20px;
		padding-top: 5px;
	}
</style>
