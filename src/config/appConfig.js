require('dotenv').config();

const FACEBOOK_API_URL = 'https://graph.facebook.com/v19.0/me?fields=id,name,last_name';
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN || '';

module.exports = { FACEBOOK_API_URL, FACEBOOK_ACCESS_TOKEN };