import Cookies from 'js-cookie'
import getToken from './getToken'

export default async function tokenHandler() {
  const urlParams = new URLSearchParams(window.location.search)
  const CODE = urlParams.get('code')

  if (CODE) {
    const data = await getToken(CODE)
    const dataStr = JSON.stringify(data)
    Cookies.set('token', dataStr, {
      expires: 1,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    })
    console.log('token stored')
  }
}
