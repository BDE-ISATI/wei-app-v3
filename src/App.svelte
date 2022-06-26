<script>
	import BottomBar from "./lib/BottomBar.svelte";
	import Defi from "./lib/Defi.svelte";

	const P = {
		PAccueil: "Accueil",
		PDefi: "Défis",
		PClassement: "Classement",
	};

	var pageActuelle = P.PDefi;

	const RequestType = {
		GetDefi: "defis",
		GetClassement: "classement",
		GetUserPerm: "permissions"
	}

	let defis = [
	];

	
	async function requestData (type, additionnal = '') {
		console.log("Requesting for: " + type);
		const res = await fetch('http://127.0.0.1:3100/', {
			method: 'POST',
			body: JSON.stringify({
				type: type
			})
		})
		
		const json = await res.json()
		console.log(json);
		switch (type) {
                    case RequestType.GetDefi:
						defis = json;
                        break;
                    default:
                        break;
                }
	}

	//Init
	requestData(RequestType.GetDefi);
</script>

<main>
	<div class="center">
		<div class="app_center">
			{#if pageActuelle == P.PDefi}
				{#each defis as _defi}
					<Defi
						name={_defi.name}
						description={_defi.description}
						points={_defi.points}
					/>
				{/each}
			{/if}
		</div>
		<BottomBar bind:state={pageActuelle} on:defi_request={() => requestData(RequestType.GetDefi)} />
	</div>
</main>

<svelte:head>
	<link href="http://fonts.cdnfonts.com/css/cascadia-code" rel="stylesheet" />
</svelte:head>

<style>
	:root {
		font-family: "Cascadia Code", sans-serif;
		font-size: 5vw;
	}

	@media only screen and (min-width: 768px) {
		:root {
			font-size: 20px;
		}
	}

	.center {
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.app_center {
		height: 100%;
		width: 100%;
		display: block;
		max-width: 400px;
	}
</style>
