require('dotenv').load();
const key = process.env.KEY;
const secret = process.env.SECRET;

const jwplayer = require('jwplayer-node')
    ({ api_key: key, api_secret: secret });

let options = {
    title: "upload example",
    description: "upload video to jwplayer hosting using node js",
    sourcetype: "file"

};

jwplayer.call_api(
    {
        method: 'post',
        path: '/v1/videos/create',
    },
    options)
    .then(succ => {
        console.log(succ.data);
        /*
        { status: 'ok',
  media: { type: 'video', key: 'OyDxj6hI' },
  link:
   { path: '/v1/videos/upload',
     query:
      { token: 'fb5b234a071812dec46bffdd009c31d86a01e6a0d08',
        key: 'OyDxj6hI' },
     protocol: 'http',
     address: 'upload.jwplatform.com' },
  rate_limit: { reset: 1552279560, limit: 60, remaining: 59 } }*/
    })
    .catch(err => {
        console.log(err);
    })