import { Image, Spinner, Tabs, Tab } from '@nextui-org/react'
import NextImage from 'next/image'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/file'
import { imageLoader } from '../imageLoader'

export default function Gallery({ data }) {
  const [favsID, setFavsID] = useState([])
  const [favsPost, setFavsPost] = useState([])
  const photos = data?.data.filter((post) => post.media_type !== 'VIDEO') || []
  const videos = data?.data.filter((post) => post.media_type === 'VIDEO') || []

  useEffect(() => {
    async function getFavs() {
      const res = await fetch('/api/favourites/getFav')
      const data = await res.json()
      setFavsID(data.favourites)
    }
    getFavs()
  }, [])

  useEffect(() => {
    async function getMedia() {
      favsID.forEach(async (id) => {
        const res = await fetch(`/api/media/getSpecific?id=${id}`)
        const data = await res.json()
        setFavsPost((prev) => {
          if (prev.some((post) => post.post_id === data.post[0].post_id))
            return prev
          return [...prev, data.post[0]]
        })
      })
    }
    getMedia()
  }, [favsID])

  useEffect(() => {
    console.log(favsPost)
  })

  return (
    <>
      <div className="flex flex-col w-full mb-16">
        <Tabs
          color="primary"
          variant="solid"
          aria-label="Options"
          className="m-auto"
        >
          <Tab key="photos" title="Photos">
            <section className="grid grid-cols-3 gap-2">
              {photos.map((post) => (
                <Image
                  loader={imageLoader}
                  as={NextImage}
                  key={post.id}
                  src={post.media_url}
                  alt=""
                  width={200}
                  height={200}
                  priority
                />
              ))}
            </section>
          </Tab>
          <Tab key="videos" title="Videos">
            <section className="grid grid-cols-3 gap-2">
              {videos.map((post, index) => (
                <ReactPlayer
                  key={index}
                  url={post.media_url}
                  muted={true}
                  controls={true}
                  width={200}
                  height={200}
                  loop={true}
                />
              ))}
            </section>
          </Tab>
          <Tab key="favourite" title="Favourite">
            <section className="grid grid-cols-3 gap-2">
              {favsPost &&
                favsPost.map((post) => {
                  {
                    return post.media_type === 'IMAGE' ||
                      post.media_type === 'CAROUSEL_ALBUM' ? (
                      <Image
                        loader={imageLoader}
                        as={NextImage}
                        key={post.id}
                        src={post.media_url}
                        alt=""
                        width={200}
                        height={200}
                        priority
                      />
                    ) : (
                      <ReactPlayer
                        key={post.id}
                        url={post.media_url}
                        muted={true}
                        controls={true}
                        width={134}
                        height={134}
                        loop={true}
                      />
                    )
                  }
                })}
            </section>
          </Tab>
        </Tabs>
      </div>
      {!data && (
        <div className="flex justify-center items-center ">
          <Spinner size="lg" color="primary" />
        </div>
      )}
    </>
  )
}
