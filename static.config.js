// This file is used to configure:
// - static-site generation
// - Document shell (index.html)
// - ...tons of other things!

// Get started at httsp://react-static.js.org

import React, { Component } from 'react';

export default {
  Document: class CustomHtml extends Component {

    render () {
      const { Html, Head, Body, children } = this.props
    
      return (
        // eslint-disable-next-line no-unused-expressions
        <Html lang="en-US">
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Body>
            <script src="https://apis.google.com/js/api.js"></script>
            {children}
          </Body>
        </Html>
      )
    }
  }
}
