import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Card from '../components/Card'
import Content from '../components/Content'
import Header from '../components/Header'
import Layout from '../components/Layout'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.theme.gridColumns}, 1fr);
  grid-gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .gatsby-image-outer-wrapper,
  .gatsby-image-wrapper {
    position: static !important;
  }
`

const BG = styled.div`
  background-color: ${(props) => props.theme.colors.bg};
`

const Index = ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout>
    <Header />
    <BG>
      <Content>
        <Grid>
          {edges.map((project, index) => (
            <Card
              delay={index}
              date={project.node.frontmatter.date}
              title={project.node.frontmatter.title}
              cover={project.node.frontmatter.cover.childImageSharp.fluid}
              path={project.node.fields.slug}
              areas={project.node.frontmatter.areas}
              key={project.node.fields.slug}
            />
          ))}
        </Grid>
      </Content>
    </BG>
  </Layout>
)

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query HomeQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            cover {
              childImageSharp {
                fluid(maxWidth: 760, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            date(formatString: "DD.MM.YYYY")
            title
            areas
          }
        }
      }
    }
  }
`
