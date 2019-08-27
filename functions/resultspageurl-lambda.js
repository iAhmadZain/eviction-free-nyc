'use strict'
import logic from '../src/utils/logic';

import enMessages from '../src/data/messages/en-US';
import esMessages from '../src/data/messages/es';

const MESSAGES = {
  'en-us': enMessages,
  'es': esMessages
}

// given a result string URL (ex: /en-us/admin-hearings?zip=11216) return the title
function determineTitleKeyFromResultURL(url) {
  if(/admin-hearings/.test(url)) {
    return 'titleOverride';
  } else if(/rtc/.test(url)) {
    return 'qualifiedTitle';
  } else {
    return 'notQualifiedTitle';
  }
}

exports.handler = (event, context, callback) => {

  const parsedBody = JSON.parse(event.body);
  const locale = parsedBody.locale;

  // Booleans are given to us as strings here
  var user = {
    zip: parsedBody.zip,
    boro: parsedBody.boro,
    nycha: parsedBody.nycha == 'true',
    incomeEligible: parsedBody.incomeEligible == 'true',
    caseType: parsedBody.caseType
  };

  try {
    const resultsURL = logic.determineResultPage(user, { locale: locale });
    const titleKey = determineTitleKeyFromResultURL(resultsURL);
    const title = MESSAGES[locale][titleKey];

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        result_url: resultsURL,
        title: title
      })
    });

  } catch(err) {

    callback(err);
  }
}
