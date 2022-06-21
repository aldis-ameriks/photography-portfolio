import 'justifiedGallery/dist/css/justifiedGallery.min.css'
import 'justifiedGallery/dist/js/jquery.justifiedGallery.min'
import { getSrc, getSrcSet, IGatsbyImageData } from 'gatsby-plugin-image'
import $ from 'jquery'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Lightbox from 'react-images'

const Wrapper = styled.div`
  margin-bottom: 50px;
`

const ImageWrapper = styled.div`
  cursor: pointer;
`

type Props = {
  images: { fixed: IGatsbyImageData; fluid: IGatsbyImageData }[]
}

export const Gallery: React.FC<Props> = ({ images }) => {
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    $('#gallery').justifiedGallery({
      rowHeight: 240,
      captions: false,
      margins: 1
    })
  }, [])

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

  return (
    <Wrapper id="gallery" className="justified-gallery">
      {images
        .filter((image) => image?.fluid && image?.fixed)
        .map((image, i) => (
          <ImageWrapper
            key={i}
            onClick={() => {
              setPhoto(i)
            }}
          >
            <img src={getSrc(image.fluid)} alt="Gallery image" />
          </ImageWrapper>
        ))}

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
