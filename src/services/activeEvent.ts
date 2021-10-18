function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export async function fetchEvent() {
  return fetch(process.env['REACT_APP_FETCH_ACTIVE_EVENT'])
    .then(handleErrors)
    .then(data => data.json())
    .catch(e => {
      if (e.message === 'Not Found')
        return { id: '0-0' }
      return Promise.reject()
    })
}