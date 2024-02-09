import Cookies from 'js-cookie'
import getToken from './getToken'

export default async function tokenHandler({ setIsLoading }) {
  const urlParams = new URLSearchParams(window.location.search)
  const CODE = urlParams.get('code')

  if (CODE) {
    setIsLoading(true)
    const data = await getToken(CODE)
    const dataStr = JSON.stringify(data)
    Cookies.set('token', dataStr, {
      expires: 1,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    })
  }
}
