import React from 'react';
// import graphql from 'graphql';
import Layout from './index';
import { addLocaleData } from 'react-intl';

import messages from '../static/messages/en-US';
import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';

addLocaleData(en);

const EnLayout = (props) => {

  console.log('messages', messages);
 return (
    <Layout
      {...props}
      i18nMessages={messages}
    />
  );
}

export default EnLayout

export const pageQuery = graphql`
  query LayoutEnUs {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`;
