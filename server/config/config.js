exports.FACEBOOK_APP_ID = '340368379503082';
exports.FACEBOOK_APP_SECRET = '473253ce50a45945cc22bcd219912360';
exports.FACEBOOK_CALLBACK_URL = 'http://127.0.0.1:8080/auth/facebook/callback';

exports.GOOGLE = {
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '3m-NIieK64vK9BgQWBwWIFsA',
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '13307977341-nvmd7m9qj8hbjtrcrj6mtfnfnpq4dmd6.apps.googleusercontent.com',
  CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://127.0.0.1:8080/auth/google/callback',
  SCOPE: 'https://www.googleapis.com/auth/userinfo.email ' + 'https://www.googleapis.com/auth/userinfo.profile'
}

exports.MONGO_URL = process.env.MONGOLAB_URI || 'mongodb://localhost/health-quiz';