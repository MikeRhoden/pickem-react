interface ICredentials {
  username: string;
  password: string;
}

interface ICreateUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export async function loginUser(credentials: ICredentials) {
  return fetch('http://big12pickem.com/rpc/user/get/user.asp', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }).then(handleErrors).then(data => data.json().catch()
  );
}

export async function createUser(user: ICreateUser) {
  return fetch('http://big12pickem.com/rpc/user/post/user.asp', {
    method: 'POST',
    body: JSON.stringify(user)
  }).then(handleErrors).then(data => data.json().catch()
  );
}