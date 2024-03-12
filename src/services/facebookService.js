const axios = require('axios');
const _ = require('lodash');
const { logger } = require('../utils/logger');
const { FACEBOOK_API_URL, FACEBOOK_ACCESS_TOKEN } = require('../config/appConfig');
const ONE_MINUTE = 60 * 1000;
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
  try {
    const response = await axios.get(FACEBOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${FACEBOOK_ACCESS_TOKEN}`,
      },
    });

    // Log the received data
    logger(JSON.stringify(response.data));

    // call_count - A whole number expressing the percentage of calls made by your app over a rolling one hour period.
    const callCount = _.get(JSON.parse(response.headers['x-app-usage']), 'call_count', 0);
    /**
     * From the facebook API
     * Calls within one hour = 200 per Users in rolling one hour window
     * When call_count reaches 100, calls may be throttled.
     * if there is no reset time in response header, so to handle the rate limiting we need to wait for 1 hour to reset call_count to zero.
     */
    if(callCount >= 98){
      const resetTime = 60 * ONE_MINUTE //Default reset time is 1 hour
      const resetTimeDuration = _.get(response.headers['x-ad-account-usage'], 'reset_time_duration');
      if(resetTimeDuration){
        resetTime = new Date(Number(resetTimeDuration) * 1000) - Date.now()
      }
      await wait(resetTime); 
    }

    // Wait for 2 seconds before making the next request
    setTimeout(fetchData, 2000);
  } catch (error) {
    // Handle errors, including rate limit exceeded & Check if reset time information is available (this might vary based on Facebook's API responses)
    if (error.response && error.response.status === 403) {
      const resetTimeDuration = _.get(error.response.headers['x-ad-account-usage'], 'reset_time_duration');
      if(!resetTimeDuration){
        logger(`Error: Rate limit exceeded. No Reset time information is available in response headers.`);
      }else{
        const resetTime = new Date(Number(resetTimeDuration) * 1000);
        logger(JSON.stringify(error.message));
        setTimeout(fetchData, resetTime.getTime() - Date.now());
      }
    }else {
      logger(`Error: ${error.message}`);
    }
  }
};

module.exports = { fetchData };