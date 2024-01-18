'use client'

import { NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import getData from '@/lib/getData'

export default function Home() {
  async function tets() {
    const data = await getData()
    console.log(data)
  }

  async function getImage() {
    const response = await fetch(
      `https://graph.instagram.com/v18.0/17898781577791819?fields=id,media_type, media_url,username,timestamp&access_token=IGQWRQQUpPN0RZAcE9ON3U4M1gxRmtQanlQY1ROZAllOQkF2QXl4cVVIWkh2V0lueHlMRC1TUkpTck1mVmxacEw0d3FrTFJobjQ4RFM3SWZAOeWwxYXJzQS1ydFVsbnBTYWhPOHZAQb05QbGQxNVpDcEstaGNoeVVzT1kZD`
    )

    const data = await response.json()
    console.log(data)
  }
  return (
    <NextUIProvider>
      <div className="container">
        <Button onClick={tets} color="primary">
          Test
        </Button>

        <Button onClick={getImage} color="primary">
          image
        </Button>
      </div>
    </NextUIProvider>
  )
}
