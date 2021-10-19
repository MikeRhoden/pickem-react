import { IUser } from "../models/IUser";

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export async function fetchEvent() {
  const user: IUser = JSON.parse(sessionStorage.getItem('user'))
  const headers = new Headers({
    'Authorization': 'Bearer ' + user.Token
  });
  return fetch(process.env['REACT_APP_FETCH_ACTIVE_EVENT'],
    {
      headers: headers
    })
    .then(handleErrors)
    .then(data => data.json())
    .catch(e => {
      if (e.message === 'Not Found')
        return { id: '0-0' }
      return Promise.reject()
    })
}