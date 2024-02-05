'use server'

export default async function getToken(CODE) {
  const url = 'https://api.instagram.com/oauth/access_token'
  const params = {
    client_id: process.env.NEXT_PUBLIC_APP_ID,
    client_secret: process.env.APP_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    code: CODE,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params),
  })

  return response.json()
}
