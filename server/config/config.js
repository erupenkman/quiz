exports.FACEBOOK_APP_ID = '340368379503082';
exports.FACEBOOK_APP_SECRET = '473253ce50a45945cc22bcd219912360';
exports.FACEBOOK_CALLBACK_URL = 'http://127.0.0.1:8080/auth/facebook/callback';

exports.GOOGLE_RETURN_URL = process.env.GOOGLE_RETURN_URL || 'http://127.0.0.1:8080/auth/google/return';
exports.GOOGLE_REALM = process.env.GOOGLE_REALM || 'http://127.0.0.1:8080/';

exports.MONGO_URL = process.env.MONGOLAB_URI || 'mongodb://localhost/health-quiz';