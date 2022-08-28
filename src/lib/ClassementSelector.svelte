<script>
	export var showingJoueurs = true;
</script>

<div class="card">
	<div class="btn_background" data-isjoueur={showingJoueurs} />
	<button class="joueurs_btn" data-isselected={showingJoueurs} on:click={() => (showingJoueurs = true)}
		>Joueurs</button>
	<button class="equipes_btn" data-isselected={!showingJoueurs} on:click={() => (showingJoueurs = false)}
		>Équipes</button>
</div>

<style>
	.card {
		display: grid;
	}

	.joueurs_btn {
		grid-column: 1;
		grid-row: 1;

		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	.equipes_btn {
		grid-column: 2;
		grid-row: 1;

		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}

	button {
		background-color: rgba(0, 0, 0, 0);
		border: none;
        transition-duration: 300ms;
	}

    button:hover {
		background-color: rgba(0, 0, 0, 0);
    }

    button[data-isselected="true"] {
        font-weight: 800;
    }

	.btn_background {
		grid-column: 1 / 3;
		grid-row: 1;
        width: 50%;
        height: 100%;
		background-color: rgb(226, 226, 226);
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(.15,.01,0,1);
        border-radius: 0.5em;
	}

	.btn_background[data-isjoueur="true"] {
		margin: 0px;
        margin-left: 0%;
        margin-right: 50%;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	.btn_background[data-isjoueur="false"] {
		margin: 0px;
        margin-left: 50%;
        margin-right: 0%;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}
</style>
