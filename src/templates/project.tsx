import { graphql, PageProps } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Gallery from '../components/Gallery'
import Layout from '../components/Layout'
import ProjectHeader from '../components/ProjectHeader'
import SEO from '../components/SEO'

const Content = styled.div`
  padding: 0 ${(props) => props.theme.contentPadding};
`

const Project = ({
  children,
  pageContext: { slug },
  data: { mdx: postNode, images }
}: PageProps<Queries.ProjectQuery, { slug: string }>) => {
  const project = postNode.frontmatter
  return (
    <Layout customSEO>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <ProjectHeader date={project.date} title={project.title} areas={project.areas} text={children} />

      <Content>
        <Gallery
          images={images.edges.map((image) => ({
            fixed: image.node.childImageSharp.fixed,
            fluid: image.node.childImageSharp.fluid
          }))}
        />
      </Content>
    </Layout>
  )
}

export default Project

export const pageQuery = graphql`
  query Project($slug: String!, $absolutePathRegex: String!) {
    images: allFile(
      filter: {
        absolutePath: { regex: $absolutePathRegex }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
      sort: { name: ASC }
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
    mdx(fields: { slug: { eq: $slug } }) {
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
