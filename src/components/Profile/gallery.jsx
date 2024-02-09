import { Image, Spinner, Tabs, Tab } from '@nextui-org/react'
import NextImage from 'next/image'

export default function Gallery({ data }) {
  const photos = data?.data.filter((post) => post.media_type !== 'VIDEO') || []
  const videos = data?.data.filter((post) => post.media_type === 'VIDEO') || []

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
              {videos.map((post) => (
                <div
                  key={post.id}
                  className="border border-black max-w-[200px] max-h-[200px]"
                >
                  <iframe
                    src={post.media_url}
                    className="w-full h-full"
                  ></iframe>
                </div>
              ))}
            </section>
          </Tab>
          <Tab key="favourite" title="Favourite">
            {/* Hvis favourite her */}
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
