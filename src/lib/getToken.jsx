'use server'

export default async function getToken({ CODE }) {
  const tokenLink = `https://api.instagram.com/oauth/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URL}&code=${CODE}`

  const response = await fetch(tokenLink)
  return response
}
