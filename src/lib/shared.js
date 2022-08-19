import { Crypt, RSA } from "hybrid-crypto-js";

//This is the function that handles requests to the server
export async function requestData(type, password = null, key = null, data = {}) {

	const body = {
		type: type,
		data: data,
		password: password,
		key: key
	};

	console.log("Requesting for: ", type);
	console.log(body);
	//console.log("Data", data);
	const res = await fetch(
		"https://polar-oasis-87108.herokuapp.com/wei-app-server.herokuapp.com",
		//"http://127.0.0.1:5000",
		{
			method: "POST",
			body: JSON.stringify(body),
		}
	).then(res => {
		//console.log(res);
        if (res.status>=200 && res.status <300) {
          return res.json();
        }else{
          throw new Error();
        }
    });

	console.log(res);
    return res;
}

export async function requestWithAuth(type, password, data) {
	var crypt = new Crypt();
	const key = await requestData(RequestType.generateEncryptionKey);

	const encrypted_password = await crypt.encrypt(key, password);

	return await requestData(type, encrypted_password, key, data);
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