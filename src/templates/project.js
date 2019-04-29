import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Lightbox from 'react-images'
import styled from 'styled-components'

import config from '../../config/site'
import { Layout, ProjectHeader, SEO } from '../components'

const BG = styled.div`
  background-color: ${props => props.theme.colors.bg};
  position: relative;
  padding: 2rem 0 0 0;
`

const OuterWrapper = styled.div`
  padding: 0 ${props => props.theme.contentPadding};
  margin: -5rem auto 0 auto;

  column-count: 1;
  column-gap: 15px;

  @media (min-width: ${props => props.theme.breakpoints.xs}) {
    column-count: 2;
  }
  @media (min-width: ${props => props.theme.breakpoints.m}) {
    column-count: 3;
  }
  @media (min-width: ${props => props.theme.breakpoints.l}) {
    column-count: 4;
  }
`

const InnerWrapper = styled.div`
  break-inside: avoid;
  margin-bottom: 15px;
`

class Project extends Component {
  state = {
    shareOpen: false,
    anchorEl: null,
    lightbox: false,
    photos: this.props.data.images.edges.map(image =>
      Object.assign({
        srcSet: image.node.childImageSharp.fluid.srcSetWebp,
        src: image.node.childImageSharp.fixed.srcWebp,
        thumbnail: image.node.childImageSharp.fixed.srcWebp,
      })
    ),
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
    event.preventDefault()
    this.setState({ lightbox: true, photo })
  }

  closeLightbox() {
    this.setState({ lightbox: false })
  }

  render() {
    const {
      pageContext: { slug, prev, next },
      data: { project: postNode, images: imgs },
    } = this.props
    const images = imgs.edges
    const project = postNode.frontmatter
    return (
      <Layout customSEO>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <ProjectHeader
          avatar={config.avatar}
          name={config.name}
          date={project.date}
          title={project.title}
          areas={project.areas}
          text={postNode.code.body}
        />

        <BG>
          <OuterWrapper>
            {images.map((image, i) => (
              <InnerWrapper key={image.node.childImageSharp.fluid.src} onClick={e => this.openLightbox(i, e)}>
                <Img alt={image.node.name} fluid={image.node.childImageSharp.fluid} />
              </InnerWrapper>
            ))}
          </OuterWrapper>

          <Lightbox
            backdropClosesModal
            width={1600}
            showThumbnails
            images={this.state.photos}
            currentImage={this.state.photo}
            isOpen={this.state.lightbox}
            onClickPrev={() => this.gotoPrevLightboxImage()}
            onClickNext={() => this.gotoNextLightboxImage()}
            onClose={() => this.closeLightbox()}
            onClickThumbnail={photo => this.setState({ photo })}
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
            fixed(width: 50, height: 50) {
              srcWebp
            }
          }
        }
      }
    }
    project: mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
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
