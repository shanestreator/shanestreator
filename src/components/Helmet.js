import React from 'react';
import ReactHelmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const Helmet = ({ theme = {} }) => (
  <StaticQuery
    query={graphql`
      query HelmetQuery {
        contentfulAbout {
          name
        }
        contentfulAboutDescriptionRichTextNode {
          description
        }
        contentfulFaviconMedia {
          favicon16 {
            resize(width: 16) {
              src
            }
          }
          favicon32 {
            resize(width: 32) {
              src
            }
          }
          bigIcon {
            resize(width: 192) {
              src
            }
          }
          appleIcon {
            resize(width: 180) {
              src
            }
          }
        }
        site {
          siteMetadata {
            defaultTitle: title
            siteUrl
            defaultImage: image
            favicon
          }
        }
      }
    `}
    render={data => {
      console.log('data: ', data)
      const { favicon16, favicon32, bigIcon, appleIcon } = data.contentfulFaviconMedia
      let { description } = data.contentfulAboutDescriptionRichTextNode
      const { name } = data.contentfulAbout
      const title = `${name}`

      const { favicon } = data.site.siteMetadata
      
      description = JSON.parse(description).content[0].content[0].value

      return (
        <ReactHelmet htmlAttributes={{ lang: 'en' }}>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="shortcut icon" href={favicon} />
          <meta name="theme-color" content={theme.background} />
          <meta name="image" content={`https:${favicon32.src}`} />
          <meta itemProp="name" content={title} />
          <meta itemProp="description" content={description} />
          {/* <meta itemProp="image" content={`https:${favicon32.src}`} /> */}
          <meta name="og:title" content={title} />
          <meta name="og:description" content={description} />
          {/* <meta name="og:image" content={`https:${bigIcon.src}`} /> */}
          <meta name="og:site_name" content={title} />
          <meta name="og:locale" content="en_US" />
          <meta name="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          {/* <meta name="twitter:image" content={`https:${bigIcon.src}`} />
          <meta
            name="twitter:image:src"
            content={`https:${bigIcon.src}`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`https:${appleIcon.src}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`https:${favicon32.src}`}
          /> */}
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={favicon}
          />
        </ReactHelmet>
      );
    }}
  />
);

Helmet.propTypes = {
  // eslint-disable-next-line
  theme: PropTypes.object,
};

export default withTheme(Helmet);
