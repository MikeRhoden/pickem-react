import { IUser } from "../models/IUser";

interface IMenuItemResponse {
  Name: string;
  Href: string;
}
export async function fetchMenu() {
  var user: IUser = JSON.parse(sessionStorage.getItem("user"))
  var token = user.Token
  var headers = new Headers({
    "authorization": "Bearer " + token
  })

  return fetch('http://localhost:5050/api/menu', {
    headers: headers
  })
    .then(data => data.json())
    .then(data => {
      return data.map((item: IMenuItemResponse) => {
        return {
          Name: item.Name,
          Href: item.Href,
          Current: false
        }
      })
    });
  // return [
  //   { Name: 'Your Picks', Href: 'event', Current: false },
  //   { Name: 'Dashboard', Href: 'dashboard', Current: false },
  // ]
}