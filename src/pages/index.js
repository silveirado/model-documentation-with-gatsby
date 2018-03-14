import React from 'react'
import Link from 'gatsby-link'
import { pipe, prop, map, path, reduce, mapObjIndexed, values } from 'ramda'

const IndexPage = pipe(
  prop('data'),
  prop('allMongodbGalgoNamespaces'),
  prop('edges'),
  edges =>
    React.createElement(
      'div',
      null,
      map(
        pipe(path(['node']), node =>
          React.createElement('div', { key: node.id }, [
            React.createElement('h2', { key: `header_${node.id}` }, node.id),
            React.createElement(
              'h6',
              { key: `version_${node.id}` },
              `Version: ${path(['info', 'version'], node)}`
            ),
            React.createElement(
              'p',
              { key: `description_${node.id}` },
              path(['info', 'description'], node)
            ),
            React.createElement(
              'ul',
              { key: `types_${node.id}` },
              pipe(
                path(['internal', 'content']),
                JSON.parse,
                prop('types'),
                mapObjIndexed((typeProps, typeName) =>
                  React.createElement(
                    'li',
                    { key: `${node.id}_${typeName}` },
                    typeName
                  )
                ),
                values
              )(node)
            ),
          ])
        ),
        edges
      )
    )
)

export default IndexPage

export const pageQuery = graphql`
  query PageQuery {
    allMongodbGalgoNamespaces {
      edges {
        node {
          id
          info {
            description
            version
          }
          internal {
            content
          }
        }
      }
    }
  }
`
