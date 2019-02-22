require('dotenv').load();
const key = process.env.KEY;
const secret = process.env.SECRET;

const jwplayer = require('jwplayer-node')
    ({ api_key: key, api_secret: secret });

let options = {
    title: "upload example",
    description: "upload video to jwplayer hosting using node js",
    sourcetype: "url",
    sourceformat: "youtube",
    sourceurl: "https://www.youtube.com/watch?v=xcJtL7QggTI"

};

jwplayer.call_api(
    {
        method: 'post',
        path: '/v1/videos/create',
    },
    options)
    .then(succ => {
        console.log(succ);

        // succ.data
        /*{
            status: 'ok',
                rate_limit: { reset: 1550825760, limit: 60, remaining: 59 },
            video: { key: 'video_key' }
        }*/
    })
    .catch(err => {
        console.log(err);
    })