'use server'

export default async function getData(TOKEN) {
  const response = await fetch(
    `https://graph.instagram.com/v18.0/me/media?access_token=${TOKEN}`
  )

  const data = await response.json()

  return data
}
