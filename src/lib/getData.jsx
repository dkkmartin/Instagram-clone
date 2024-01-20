'use server'

export default async function getData() {
  const response = await fetch(
    `https://graph.instagram.com/v18.0/me/media?access_token=${process.env.API_KEY}`
  )

  const data = await response.json()

  return data
}
