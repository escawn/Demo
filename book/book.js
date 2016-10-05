'use strict';

//引入模块
var https    = require('https');
var fs      = require('fs');
var path    = require('path');
var cheerio = require('cheerio');

/**
 * 下载图片
 *
 * @param {string} imgDir 存放图片的文件夹
 * @param {string} url 图片的URL地址
 */
function downloadImg(imgDir,url){
    https.get(url,function(res){
        var data = '';
        res.setEncoding('binary');
        res.on('data',function(chunk){
            data += chunk;
        })
        res.on('end',function(){
            fs.writeFile(imgDir+path.basename(url),data,'binary',function(err){
                if(err){
                   return console.error(err);
                }
                console.log('Image downloaded: ', path.basename(url))
            })
        })
    }).on('error',function(err){
        console.error(err);
    })
}

/**
 * 保存数据到本地
 *
 * @param {string} path 保存数据的文件夹
 * @param {array} movies 电影信息数组
 */
function saveData(path, books) {
    console.log(books);
    // 调用 fs.writeFile 方法保存数据到本地
    // fs.writeFile(filename, data[, options], callback)
    // fs.writeFile 方法第一个参数是需要保存在本地的文件名称（包含路径）
    // 第二个参数是文件数据
    // 然后有个可选参数，可以是 encoding，mode 或者 flag
    // 最后一个参数是一个回调函数
    fs.writeFile(path, JSON.stringify(books, null, ' '), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Data saved');
    });
}

//创建https get请求
function spiderMovie(){
    https.get('https://book.douban.com/chart',function(res){
        var html  = '';
        var books = [];
        res.setEncoding('utf-8');

        res.on('data',function(chunk){
            html += chunk;
        });
        
        res.on('end',function(){
            var $ = cheerio.load(html);

            $('.media.clearfix').each(function(){
                var picUrl = $('.subject-cover',this).attr('src');
                var book   = {
                    title: $('.clearfix > a',this).text(),
                    star:  $('.font-small.color-red.fleft',this).text(),
                    info:  $('.subject-abstract.color-gray',this).text(),
                    picUrl:picUrl,
                    link:  $('.media__img>a',this).attr('href')
                };

                if(book){
                    books.push(book);
                }
                downloadImg('./img/',book.picUrl);
            });

            saveData('./data.json',books);
        })
    }).on('error',function(err){
        console.error(err);
    })
}

//执行
spiderMovie();