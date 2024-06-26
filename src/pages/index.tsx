import { graphql, PageProps } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import Card from '../components/Card'
import Content from '../components/Content'
import Header from '../components/Header'
import Layout from '../components/Layout'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 50px;

  @media (min-width: ${({ theme }) => theme.breakpoints.m}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const GalleryClientSide = React.lazy(() => import('../components/Gallery'))

const Index: React.FC<PageProps<Queries.HomeQuery>> = ({ data }) => {
  const isSSR = typeof window === 'undefined'

  return (
    <Layout>
      <Content>
        {!isSSR && data.allFile.nodes.length > 0 && (
          <React.Suspense fallback={<div style={{ height: '100vh' }} />}>
            <GalleryClientSide images={data.allFile.nodes.map((node) => node.childImageSharp)} />
          </React.Suspense>
        )}

        <Header />
        <Grid>
          {data.allMdx.edges.map((project, index) => (
            <Card
              delay={index}
              date={project.node.frontmatter.date}
              title={project.node.frontmatter.title}
              cover={project.node.frontmatter.cover.childImageSharp.gatsbyImageData}
              path={project.node.fields.slug}
              areas={project.node.frontmatter.areas}
              key={project.node.fields.slug}
            />
          ))}
        </Grid>
      </Content>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query Home {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            cover {
              childImageSharp {
                gatsbyImageData(width: 760, quality: 90, layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
            date(formatString: "DD.MM.YYYY")
            title
            areas
          }
        }
      }
    }

    allFile(filter: { sourceInstanceName: { eq: "gallery" } }, sort: [{ name: DESC }]) {
      nodes {
        birthTime
        childImageSharp {
          fluid: gatsbyImageData(quality: 90, layout: FULL_WIDTH, placeholder: BLURRED)
          fixed: gatsbyImageData(layout: FIXED, width: 100, height: 100, placeholder: BLURRED)
        }
      }
    }
  }
`
