import axios from "axios";
import { load } from "cheerio";
function y2mate(url) {
    return new Promise(async(resolve, reject) =>{
        if(!await youtube_parser(url)) reject("Không tìm thấy id của video này")
        axios({
            method: 'post',
            url: 'https://www.y2mate.com/mates/en68/analyze/ajax',
            headers: {
                accept: "*/*",
                'accept-language': "en-US,en;q=0.9,vi;q=0.8",
                'content-type': "multipart/form-data"
            },
            data: {
                url: `https://youtu.be/${await youtube_parser(url)}`,
                q_auto: 0,
                ajax: 2
            }
        }).then(async(res) => {
            const $ = load(res.data.result);
            const imageSrc = $('div[class="thumbnail cover"]').find('a > img').attr('src'),
                title = $('div[class="caption text-left"]').find('b').text(),
                size = $('div').find('#mp3 > table > tbody > tr > td:nth-child(2)').text(),
                type = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-ftype'),
                quality = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-fquality'),
                id = /var k__id = "(.*?)"/.exec(res.data.result)[1]
            await axios({
                method: 'post',
                url: 'https://www.y2mate.com/mates/en68/convert',
                headers: {
                    accept: "*/*",
                    'accept-language': "en-US,en;q=0.9,vi;q=0.8",
                    'content-type': "multipart/form-data"
                },
                data:{
                    type: 'youtube',
                    v_id: await youtube_parser(url),
                    _id: id,
                    ajax: '1',
                    token: '',
                    ftype: type,
                    fquality: quality
                }
            }).then(body =>{
                const $ = load(body.data.result);
                const getHref = $('div[class="form-group has-success has-feedback"]').find('a').attr("href");
                resolve({title, size, type, quality, imageSrc, getHref})
            })
        })
    })
}
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
y2mate()
