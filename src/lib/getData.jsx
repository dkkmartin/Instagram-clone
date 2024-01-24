'use server'

export default async function getData(TOKEN) {
  const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=${TOKEN}`

  const response = await fetch(url)

  return response.json()
}
