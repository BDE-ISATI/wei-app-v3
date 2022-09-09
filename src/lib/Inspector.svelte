<script>
	import Player from "./Scoreboard/Player.svelte";

	export var player;
	export var challenges;
</script>

<div class="over" on:click={() => (player = null)}>
	<div class="inspector">
		<Player bind:player />
		{#if player.challenges_done.length != 0}
			<ul>
				{#each player.challenges_done as challenge}
					<li>
						{challenges.filter((x) => x.id == challenge)[0]?.name ??
							"Défi inconnu"} - {challenges.filter(
							(x) => x.id == challenge
						)[0]?.points ?? 0} points
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.over {
		position: fixed;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		display: flex;
		background-color: rgba(0, 0, 0, 0.336);
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	.inspector {
		text-align: left;
		background-color: white;
		padding: 1em;
		border-radius: 0.8em;
		display: grid;
		grid-template-columns: 1fr;
        overflow: hidden;
		max-width: 400px;
        width: 90vw;
	}

	ul {
        max-height: 50vh;
        overflow: hidden;
		overflow-y: scroll;
	}
</style>
