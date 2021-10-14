function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export async function fetchEvent() {
  return fetch('http://big12pickem.com/rpc/event/get/event.asp?active=1')
    .then(handleErrors)
    .then(data => data.json())
    .catch(e => {
      if (e.message === 'Not Found')
        return { id: '0-0' }
      return Promise.reject()
    })
}