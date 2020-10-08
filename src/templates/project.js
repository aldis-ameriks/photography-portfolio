import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Lightbox from 'react-images'
import styled from 'styled-components'

import config from '../../config/site'
import Layout from '../components/Layout'
import ProjectHeader from '../components/ProjectHeader'
import SEO from '../components/SEO'

const BG = styled.div`
  background-color: ${(props) => props.theme.colors.bg};
  position: relative;
  padding: 2rem 0 0 0;
`

const OuterWrapper = styled.div`
  padding: 0 ${(props) => props.theme.contentPadding};
  margin: -5rem auto 0 auto;

  column-count: 1;
  column-gap: 15px;

  @media (min-width: ${(props) => props.theme.breakpoints.xs}) {
    column-count: 2;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    column-count: 3;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    column-count: 4;
  }
`

const InnerWrapper = styled.div`
  break-inside: avoid;
  margin-bottom: 15px;
  cursor: pointer;

  // Fix column layout on safari
  @media not all and (min-resolution: 0.001dpcm) {
    @media {
      display: inline-block;
      width: 100%;
      margin-bottom: 10px;
    }
  }
`

class Project extends Component {
  state = {
    lightbox: false,
    // eslint-disable-next-line react/destructuring-assignment
    photos: this.props.data.images.edges.map((image) => ({
      srcSet: image.node.childImageSharp.fluid.srcSet,
      src: image.node.childImageSharp.fixed.src,
      thumbnail: image.node.childImageSharp.fixed.src,
    })),
  }

  gotoPrevLightboxImage() {
    const { photo } = this.state
    this.setState({ photo: photo - 1 })
  }

  gotoNextLightboxImage() {
    const { photo } = this.state
    this.setState({ photo: photo + 1 })
  }

  openLightbox(photo, event) {
    this.img = event.target
    event.preventDefault()
    this.setState({ lightbox: true, photo })
  }

  closeLightbox() {
    this.setState({ lightbox: false })
    if (this.img) {
      this.img.scrollIntoView()
      this.img = null
    }
  }

  render() {
    const {
      pageContext: { slug },
      data: { project: postNode, images: imgs },
    } = this.props
    const images = imgs.edges
    const project = postNode.frontmatter
    const { photos, photo, lightbox } = this.state
    return (
      <Layout customSEO>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <ProjectHeader
          avatar={config.avatar}
          name={config.name}
          date={project.date}
          title={project.title}
          areas={project.areas}
          text={postNode.body}
        />

        <BG>
          <OuterWrapper>
            {images.map((image, i) => (
              <InnerWrapper key={image.node.childImageSharp.fluid.src} onClick={(e) => this.openLightbox(i, e)}>
                <Img alt={image.node.name} fluid={image.node.childImageSharp.fluid} />
              </InnerWrapper>
            ))}
          </OuterWrapper>

          <Lightbox
            backdropClosesModal
            width={1600}
            showThumbnails
            images={photos}
            currentImage={photo}
            isOpen={lightbox}
            onClickPrev={() => this.gotoPrevLightboxImage()}
            onClickNext={() => this.gotoNextLightboxImage()}
            onClose={() => this.closeLightbox()}
            onClickThumbnail={(p) => this.setState({ photo: p })}
          />
        </BG>
      </Layout>
    )
  }
}

export default Project

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object,
  }),
  data: PropTypes.shape({
    project: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
  }).isRequired,
}

Project.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null,
  }),
}

export const pageQuery = graphql`
  query($slug: String!, $absolutePathRegex: String!) {
    images: allFile(
      filter: {
        absolutePath: { regex: $absolutePathRegex }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
            fixed(width: 100, height: 100) {
              src
            }
          }
        }
      }
    }
    project: mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
      frontmatter {
        cover {
          childImageSharp {
            resize(width: 800) {
              src
            }
          }
        }
        date(formatString: "DD.MM.YYYY")
        title
        areas
      }
    }
  }
`
