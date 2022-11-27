export const postLogIn = async (userdata) => {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userdata),
  }).then(res => res.json())
    .catch(err => console.log('error: ', err));
}

