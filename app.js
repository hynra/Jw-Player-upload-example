require('dotenv').load();
const key = process.env.KEY;
const secret = process.env.SECRET;
const qs = require("querystring");
const request = require('request-promise-native');
const fs = require("fs");
const promisePipe = require("promisepipe");
const axios = require("axios");

const jwplayer = require('jwplayer-node')
({api_key: key, api_secret: secret});

let options = {
    title: "upload example",
    description: "upload video to jwplayer hosting using node js",
    upload_method: "s3",
    upload_content_type: "video/mp4"

};

getFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (err, file) {
            if (err) {
                reject(err)
            } else {
                resolve(file);
            }
        });
    })
};

run = async () => {
    try {
        let data = await jwplayer.call_api(
            {
                method: 'post',
                path: '/v1/videos/create',
            },
            options);

        let query = {
            AWSAccessKeyId: data.data.link.query.AWSAccessKeyId,
            Expires: data.data.link.query.Expires,
            Signature: qs.escape(data.data.link.query.Signature)
        };

        let filePath = __dirname + '/test2.mp4';
        let file = await getFile(filePath);
        let path = data.data.media.key;
        let url = data.data.link.protocol + "://" + data.data.link.address + "/" + path;

        let result = await axios.put(url, file, {
            headers: {
                'Content-Type': "video/mp4"
            },
            query: query
        });

        console.log(result);

        //let stream = await promisePipe(fs.createReadStream(__dirname + '/sample.mp4'));
        //let stream = fs.createReadStream(__dirname + '/sample.mp4', {encoding: 'binary'});
        /*let filePath = __dirname + '/test2.mp4';
        let file = await getFile(filePath);
        let path = data.data.media.key;
        let url = data.data.link.protocol + "://" + data.data.link.address + "/" + path;
        let _options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Disposition': 'attachment; filename="test2.mp4"'
            },
            uri: url,
            qs: query,
            body: file
        };

        let resp = await request(_options);
        console.log(resp); */

        /*fs.createReadStream(filePath).pipe(request(_options)).then(body => {
            console.log(body);
        }).catch(err => {
            console.log(err);
        });*/


    } catch (e) {
        console.log(e);
    }
};

run();
/*jwplayer.call_api(
    {
        method: 'post',
        path: '/v1/videos/create',
    },
    options)
    .then(data => {
        let query = {
            AWSAccessKeyId: data.data.link.query.AWSAccessKeyId,
            Expires: data.data.link.query.Expires,
            Signature: qs.escape(data.data.link.query.Signature)
        };


        console.log("file ", __dirname + '/sample.mp4');
        const itemStream = fs.createReadStream(__dirname + '/sample.mp4');
        let path = data.data.media.key;
        let url = data.data.link.protocol + "://" + data.data.link.address + "/" + path;
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'video/mp4'
            },
            uri: url,
            qs: query,
            body: itemStream
        };

        return request(options)
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });*/
