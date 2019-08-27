import { ZIPCODES } from '../data/zipcodes';
import { navigateTo } from 'gatsby-link';
import { array } from 'lodash';

export default {

  isLocationEligible(zipString) {
    const zip = parseInt(zipString, 10);
    return ZIPCODES.indexOf(zip) !== -1;
  },

  isNychaEligible(zipArray) {
    const overlap = _.intersection(zipArray, ZIPCODES);
    return overlap.length > 0;
  },

  determineResultPage(user, intl)  {

    if( user.boro === null ||
        user.caseType === null ||
        user.incomeEligible === null) {
      throw new Error("Missing a step!");
    }

    // adding in the case where the zip hasn't already been assessed
    if(user.areaEligible === null || user.areaEligible === undefined) {
      user.areaEligible = this.isLocationEligible(user.zip);
    }

    const isEligible = user.areaEligible && user.incomeEligible;

    let boro = user.boro.toLowerCase();

    // seems like google changed the autocomplete response for Bronx addrs
    if(boro === 'the bronx') boro = 'bronx';

    if(boro === 'STATEN ISLAND' || boro === 'staten island') boro = 'staten';


    // explicitly set caseType to "general" as the textbot sends whatever
    // the user inputted
    let caseType;
    if(user.nycha && user.caseType === 'other') caseType = 'other';
    else if(user.caseType !== 'nonpay' || user.caseType !== 'holdover') caseType = 'general';
    else caseType = user.caseType;
    // if(user.nycha && isEligible && user.caseType === 'nonpay') {
    //   caseType = 'nycha';
    // }

    let resultUrl = `/${intl.locale}/guide/${boro}/${caseType}`;

    //  short circuit admin hearing page
    if(user.nycha && caseType === 'other') {
      resultUrl = `/${intl.locale}/admin-hearings`;

    // all other pages
    } else {
      if(caseType !== 'general' && isEligible) {
        resultUrl += 'rtc';
      }
    }

    if(user.zip) {
      resultUrl += `?zip=${user.zip}`
    }

    if(typeof window !== 'undefined') {
      if(Rollbar !== undefined) {
        Rollbar.info("Screener completed", user);
      }

      // tracking
      if(window && window.gtag) {
        window.gtag('event', 'scr-completed');
        if(isEligible) {
          window.gtag('event', 'scr-completed-eligible');
        }
        if(user.nycha) {
          window.gtag('event', 'scr-completed-nycha');
        }
      }
    }


    return resultUrl;
  }
}
