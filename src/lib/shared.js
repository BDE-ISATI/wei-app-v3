//This is the function that handles requests to the server
export async function requestData(type, user = "", pass = "", data = {}) {

	const body = {
		type: type,
		data: data,
		username: user,
		password: pass
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

    return res;
}

//Const
export const P = {
	PAccueil: "Accueil",
	PDefi: "Défis",
	PClassement: "Classement",
};

export const RequestType = {
	GetClassement: "classement",

	GetUserAuth: "auth",
	GetUserPerm: "permissions",
	GetUser: "user",
	GetAllUser: "getall_user",
	CreateUser: "create_user",
	DeleteUser: "delete_user",

	GetDefi: "defis",
	CreateDefi: "create_defi",
	DeleteDefi: "delete_defi",
	ValidateDefi: "validate_defi",
};

export const Perm = {
	all: 3,
	manager: 2,
	player: 1,
	none: 0,
};