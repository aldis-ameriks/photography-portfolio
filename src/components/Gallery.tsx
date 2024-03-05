import { getSrc, getSrcSet, IGatsbyImageData } from 'gatsby-plugin-image'
import React, { useMemo, useState } from 'react'
import Lightbox from 'react-images'
import { Masonry } from 'react-plock'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 50px;
`

const ImageButton = styled.button`
  all: unset;
  cursor: pointer;
`

const Image = styled.img`
  width: 100%;
  height: auto;
`

type Props = {
  images: { fixed: IGatsbyImageData; fluid: IGatsbyImageData }[]
}

export const Gallery: React.FC<Props> = ({ images }) => {
  const [photo, setPhoto] = useState(null)

  const photos = useMemo(
    () =>
      images
        .filter((image) => image?.fluid && image?.fixed)
        .map((image) => ({
          srcSet: getSrcSet(image.fluid),
          src: getSrc(image.fixed),
          thumbnail: getSrc(image.fixed)
        })),
    [images]
  )

  const handleNext = () => {
    setPhoto((photo) => photo + 1)
  }

  const handlePrev = () => {
    setPhoto((photo) => photo - 1)
  }

  const handleClose = () => {
    setPhoto(null)
  }

  const filteredImages = images.filter((image) => image?.fluid && image?.fixed)

  return (
    <Wrapper>
      <Masonry
        items={filteredImages}
        config={{
          columns: [1, 2, 3],
          gap: [16, 12, 6],
          media: [640, 768, 1024]
        }}
        render={(item, idx) => {
          const imageSrc = getSrc(item.fluid)
          const imageIndex = filteredImages.findIndex((image) => getSrc(image.fluid) === imageSrc)
          return (
            <ImageButton
              onClick={() => {
                setPhoto(imageIndex)
              }}
            >
              <Image key={idx} src={imageSrc} alt="Gallery image" />
            </ImageButton>
          )
        }}
      />

      <Lightbox
        backdropClosesModal
        width={1600}
        showThumbnails
        images={photos}
        currentImage={photo}
        isOpen={photo !== null}
        onClickPrev={handlePrev}
        onClickNext={handleNext}
        onClose={handleClose}
        onClickThumbnail={(p) => {
          setPhoto(p)
        }}
      />
    </Wrapper>
  )
}

export default Gallery
