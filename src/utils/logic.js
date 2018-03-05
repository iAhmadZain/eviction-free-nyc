import { ZIPCODES } from '../data/zipcodes';
import { navigateTo } from 'gatsby-link';

export default {

  isLocationEligible(zipString) {
    const zip = parseInt(zipString, 10);
    return ZIPCODES.indexOf(zip) !== -1;
  },

  determineResultPage(user, intl)  {

    if( user.boro === null ||
        user.caseType === null ||
        user.areaEligible === null ||
        user.incomeEligible === null) {
      throw new Error("Missing a step!");
    }

    let boro = user.boro.toLowerCase();

    if(boro === 'STATEN ISLAND') boro = 'staten';



    // let resultUrl = `${intl.locale}/${user.boro}/${user.caseType}`;
    let resultUrl = `${boro}/${user.caseType}`;

    if(user.areaEligible && user.incomeEligible) {
      resultUrl += 'rtc';
    }

    navigateTo(resultUrl);
  }
}
