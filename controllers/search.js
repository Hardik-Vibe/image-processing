const express = require('express');
const router = express.Router();
const googleIms = require('google-ims');
const util = require('util');
const Jimp = require("jimp");
const fs = require('fs');
const constants = require('../app.constant');

//GET HTTP method to /search

// Route --- {{host}}/search?q=image_to_search
router.get('/',(req,res) => {
    let query = req.query.q
    let client = googleIms(constants.google_cxID, constants.google_apikey);
    client.search(query, {
        page: 1, // 10 results per page
        size: 'large', // can be: icon, small, medium, large, xlarge, xxlarge, huge
        safe: 'off', // high, medium, off
        imgType: 'photo', // clipart, face, lineart, news, photo
        colorType: 'color', // color, gray, mono
        domColor: 'black', // black, blue, brown, gray, green, pink, purple, teal, white, yellow
        dateRestrict: 'y[2]', // only show results from the last 2 years, can be d[#], w[#], m[#], y[#] for days, weeks, etc
        fileType: 'png',
        gl: 'IN', // country code for results, New Zealand in this case, http://www.spoonfork.org/isocodes.html
        googlehost: 'google.co.in', // google domain to use, in this case New Zealand
        num: 9 // number of results per page, default 10
    }).then(function (images) {
        var count = 0;
        images.map(function(rec,i) {
            rec.name = './assets/image/img_'+i+'.jpg';
            var fileName = 'img_'+i+'.jpg';
            download(rec.url,fileName, function(){
                count ++;
                //console.log(rec.name + " --> downloaded!!");
                if(count == images.length - 1){
                    res.json({success : true,data : images});        
                }
            },function(){
                fs.unlink(constants.public_folder + fileName,function(err){
                    if (err) { }
                });
                rec.name = '';
                //console.log(rec.name + " --> fail to download!!");
                count ++;
                if(count == images.length - 1){
                    res.json({success : true,data : images});        
                }
            });
            return rec;
        });
    }).catch(function(err){
        res.statusCode = 400;
        res.json({success : false,msg: 'General Exception!!'});       
    })

    var fs = require('fs'),
    request = require('request');

    var download = function(uri, fileName,successCallback,errorCallback){
        Jimp.read(uri).then(function (image) {
            if(image){
                successCallback();
                return image.resize(256, 256)     // resize
                        .quality(60)                 // set JPEG quality
                        .greyscale()                 // set greyscale
                        .write(constants.public_folder + fileName);
            }else{
                errorCallback();
            }
        }).catch(function (err) {
            errorCallback();
        });
    };
});


module.exports = router;