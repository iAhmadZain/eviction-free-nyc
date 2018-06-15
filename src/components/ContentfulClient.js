import {createClient} from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_TOKEN
});

function fetchCommunityGroups(zipcode, locale) {
  return client.getEntries({
    content_type: 'communityGroup',
    locale: locale
    // ,
    // 'fields.zipcodes[in]': zipcode
  });
}

const Client = {
  fetchCommunityGroups
};
export default Client;
