import { graphql, PageProps } from 'gatsby'
import { GatsbyImage, getSrc, getSrcSet } from 'gatsby-plugin-image'
import React, { Component } from 'react'
import Lightbox from 'react-images'
import styled from 'styled-components'
import Layout from '../components/Layout'
import ProjectHeader from '../components/ProjectHeader'
import SEO from '../components/SEO'
import { config } from '../config/site'

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

class Project extends Component<PageProps<Queries.ProjectQuery, { slug: string }>> {
  state = {
    photo: undefined,
    lightbox: false,
    // eslint-disable-next-line react/destructuring-assignment
    photos: this.props.data.images.edges.map((image) => ({
      srcSet: getSrcSet(image.node.childImageSharp.fluid),
      src: getSrc(image.node.childImageSharp.fixed),
      thumbnail: getSrc(image.node.childImageSharp.fixed)
    }))
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
      data: { project: postNode, images: imgs }
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
              <InnerWrapper key={i} onClick={(e) => this.openLightbox(i, e)}>
                <GatsbyImage alt={image.node.name} image={image.node.childImageSharp.fluid} />
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

export const pageQuery = graphql`
  query Project($slug: String!, $absolutePathRegex: String!) {
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
            fluid: gatsbyImageData(quality: 90, layout: FULL_WIDTH, placeholder: BLURRED)
            fixed: gatsbyImageData(layout: FIXED, width: 100, height: 100, placeholder: BLURRED)
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
          birthTime
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
