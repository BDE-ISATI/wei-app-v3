<script>
	export var player = {};
	var username = player.name;
	var points = player.points;
	var imgUrl = player.profilePictureUrl ? player.profilePictureUrl : "https://i.imgur.com/poJVcio.png";

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function click() {
		dispatch("clicked_profile", player);
	}
</script>

<div class="card" on:click={click}>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src={imgUrl} class="user_pfp" alt="Photo de profil" />
	<p class="description">{username}<br>{points} points</p>
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
