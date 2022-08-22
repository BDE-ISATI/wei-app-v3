import { Crypt, RSA } from "hybrid-crypto-js";

//This is the function that handles requests to the server
export async function requestData(type, data = {}, password = null, key = null) {

	const body = {
		type: type,
		data: data,
		password: password,
		key: key
	};

	console.log("Requesting for: ", type);
	console.log(data);
	const res = await fetch(
		"https://polar-oasis-87108.herokuapp.com/wei-app-server.herokuapp.com",
		//"http://127.0.0.1:5000",
		{
			method: "POST",
			body: JSON.stringify(body),
		}
	).then(res => {
		//console.log(res);
		if (res.status >= 200 && res.status < 300) {
			return res.json();
		} else {
			throw new Error();
		}
	});
	return res;
}

export async function requestWithAuth(type, password, data) {
	const crypt = new Crypt();
	const key = await requestData(RequestType.generateEncryptionKey);

	// @ts-ignore
	const encrypted_password = await crypt.encrypt(key, password);

	return await requestData(type, data, encrypted_password, key);
}

export function readFileAsync(file) {
	return new Promise((resolve, reject) => {
	  let reader = new FileReader();
  
	  reader.onload = () => {
		resolve(reader.result);
	  };
  
	  reader.onerror = reject;
  
	  reader.readAsDataURL(file);
	})
  }

function makeId(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	return result;
}


//Const
export const P = {
	PAccueil: "Accueil",
	PDefi: "Défis",
	PClassement: "Classement",
};

export const RequestType = {
	getAllPlayers: "getAllPlayers",
	createPlayer: "createPlayer",
	deletePlayer: "deletePlayer",
	validateChallenge: "validateChallenge",
	getAllDefi: "getAllDefi",
	createDefi: "createDefi",
	deleteDefi: "deleteDefi",
	generateEncryptionKey: "generateEncryptionKey",
};

export const Perm = {
	all: 3,
	manager: 2,
	player: 1,
	none: 0,
};