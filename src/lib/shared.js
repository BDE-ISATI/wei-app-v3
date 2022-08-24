const DATABASE_SERVER = "https://polar-oasis-87108.herokuapp.com/wei-app-server.herokuapp.com";






import { Crypt, RSA } from "hybrid-crypto-js";

/**
 * Sends a post request to the main server
 * @param {string} type Request type
 * @param {*} data anything you want
 * @param {string} password password (not always necessary)
 * @param {string} key encoding key (necessary if you sent a password. You will have to first get it using a request, see `requestWithAuth`)
 * @returns The data the server returned based on all info we gave
 */
export async function requestData(type, data = {}, password = null, key = null) {

	const body = {
		type: type,
		data: data,
		password: password,
		key: key
	};

	//console.log("Requesting for: ", type);
	//console.log(data);
	const res = await fetch(
		DATABASE_SERVER,
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

/**
 * Sends a request with auto generated encryption
 * @param {string} type 
 * @param {string} password 
 * @param {*} data 
 * @returns same as `requestData`
 */
export async function requestWithAuth(type, password, data) {
	const crypt = new Crypt();
	const key = await requestData(RequestType.generateEncryptionKey);

	// @ts-ignore
	const encrypted_password = await crypt.encrypt(key, password);

	return await requestData(type, data, encrypted_password, key);
}

/**
 * Read a file from a list of files you can get from an `input[type="file"]` element
 * @param {*} file 
 * @returns the base64 file
 */
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

/**
 * 
 * @param {int} length 
 * @returns a string of `length` random characters
 */
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

const RequestType = {
	getAllPlayers: "getAllPlayers",
	createPlayer: "createPlayer",
	validateChallenge: "validateChallenge",
	getAllDefi: "getAllDefi",
	generateEncryptionKey: "generateEncryptionKey",
};