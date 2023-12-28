/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GatsbyNode } from 'gatsby'
import path from 'path'
import _ from 'lodash'

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = (promise: any) =>
  promise.then((result: any) => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }: any) => {
  const { createNodeField } = actions
  let slug
  // Search for MDX filenodes
  if (node.internal.type === 'Mdx') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      // If the frontmatter has a "slug", use it
      slug = `/${_.kebabCase(node.frontmatter.slug)}`
    } else if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      // If not derive a slug from the "title" in the frontmatter
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    }
    createNodeField({ node, name: 'slug', value: slug })
  }
}

export const createPages: GatsbyNode<Queries.ProjectNodesQuery>['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectTemplate = path.resolve('./src/templates/project.tsx')

  const result: { data: Queries.ProjectNodesQuery } = await wrapper(
    graphql(`
      query ProjectNodes {
        projects: allMdx(sort: { frontmatter: { date: DESC } }) {
          edges {
            node {
              internal {
                contentFilePath
              }
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `)
  )

  const projectPosts = result.data.projects.edges

  projectPosts.forEach((edge, index) => {
    const next = index === 0 ? null : projectPosts[index - 1].node
    const prev = index === projectPosts.length - 1 ? null : projectPosts[index + 1].node

    createPage({
      path: edge.node.fields.slug,
      component: `${projectTemplate}?__contentFilePath=${edge.node.internal.contentFilePath}`,
      context: {
        slug: edge.node.fields.slug,
        // Pass the current directory of the project as regex in context so that the GraphQL query can filter by it
        absolutePathRegex: `/^${path.dirname(edge.node.internal.contentFilePath)}/`,
        prev,
        next
      }
    })
  })
}
