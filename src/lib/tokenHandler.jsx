import Cookies from 'js-cookie'
import getToken from './getToken'

export default async function tokenHandler({ setIsLoading }) {
  async function getUsername(TOKEN) {
    const url = `https://graph.instagram.com/me/?fields=username&access_token=${TOKEN}`
    const response = await fetch(url)
    return response.json()
  }

  const urlParams = new URLSearchParams(window.location.search)
  const CODE = urlParams.get('code')

  if (CODE) {
    setIsLoading(true)
    const data = await getToken(CODE)
    const username = await getUsername(data.access_token)
    const dataStr = JSON.stringify(data)
    Cookies.set('token', dataStr, {
      expires: 1,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    })
    Cookies.set('username', username.username, {
      expires: 1,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    })
  }
}
