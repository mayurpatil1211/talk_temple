module.exports = {

    'facebookAuth' : {
        
        'clientID'      : '1996842956996930', // your App ID
        'clientSecret'  : 'e37e7adfbb6d1f893f2cd66607bda746', // your App Secret
        'callbackURL'   : 'https://labor.serveo.net/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    // 'twitterAuth' : {
    //     'consumerKey'       : 'your-consumer-key-here',
    //     'consumerSecret'    : 'your-client-secret-here',
    //     'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    // },

    // 'googleAuth' : {
    //     'clientID'      : 'your-secret-clientID-here',
    //     'clientSecret'  : 'your-client-secret-here',
    //     'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    // }

};

 // 'clientID'        : '1996842956996930', // your App ID
   //      'clientSecret'    : 'e37e7adfbb6d1f893f2cd66607bda746', // your App Secret
   //      'callbackURL'     : 'https://instar.serveo.net/auth/facebook/callback',
   //      'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
   //      'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API