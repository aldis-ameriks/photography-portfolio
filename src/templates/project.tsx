import { graphql, PageProps } from 'gatsby'
import React from 'react'
import Content from '../components/Content'
import Layout from '../components/Layout'
import ProjectHeader from '../components/ProjectHeader'
import SEO from '../components/SEO'

const GalleryClientSide = React.lazy(() => import('../components/Gallery'))

const Project = ({
  children,
  pageContext: { slug },
  data: { mdx: postNode, images }
}: PageProps<Queries.ProjectQuery, { slug: string }>) => {
  const isSSR = typeof window === 'undefined'
  const project = postNode.frontmatter
  return (
    <Layout customSEO>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <ProjectHeader date={project.date} title={project.title} areas={project.areas} text={children} />

      <Content>
        {!isSSR && (
          <React.Suspense fallback={<div style={{ height: '100vh' }} />}>
            <GalleryClientSide
              images={images.edges.map((image) => ({
                fixed: image.node.childImageSharp.fixed,
                fluid: image.node.childImageSharp.fluid
              }))}
            />
          </React.Suspense>
        )}
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
