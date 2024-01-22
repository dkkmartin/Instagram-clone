'use server'

export default async function getData(TOKEN) {
  const url = `https://graph.instagram.com/me/media?fields=id,caption&access_token=${TOKEN}`

  const response = await fetch(url)

  return response.json()
}
