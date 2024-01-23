import Cookies from 'js-cookie'
import getToken from '@/lib/getToken'

export async function fetchAndStoreToken() {
  const urlParams = new URLSearchParams(window.location.search)
  const CODE = urlParams.get('code')

  if (CODE) {
    const data = await getToken(CODE)
    const dataStr = JSON.stringify(data)
    Cookies.set('token', dataStr, { expires: 1 })
    console.log('token stored')
  }
}
