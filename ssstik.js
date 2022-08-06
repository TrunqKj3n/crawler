const axios = require("axios")
function ssstik(url) {
    return new Promise((resolve, reject) => {
        try {
            axios.post('https://ssstik.io/abc?url=dl', {
                id: url,
                locale: "vi"
            }, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            }).then(res => {
                const body = res.data;
                const author = body.split('<div class="flex-1 result_overlay_buttons">')[0].split('alt=')[1]
                    .split("<h2>")[0].split(">")[0].replace('"', "").replace('"', "")
                const title = body.split('<div class="flex-1 result_overlay_buttons">')[0]
                    .split('class="maintext"')[1].split("</p>")[0].replace(">", "")
                const noLogo_1 = body.split('<div class="flex-1 result_overlay_buttons">')[1]
                    .split('a href=')[1].split('class=')[0].replace('"', "").replace('"', "").trim()
                const noLogo_2 = body.split('<div class="flex-1 result_overlay_buttons">')[1]
                    .split('a href=')[4].split('target="_blank"')[0].replace('"', "").replace('"', "").trim()
                const mp3 = body.split('<div class="flex-1 result_overlay_buttons">')[1]
                    .split('a href=')[5].split('class=')[0].replace('"', "").replace('"', "").trim()
                resolve({ author, title, noLogo_1, noLogo_2, mp3 })
            })
        } catch (e) {
            reject("Đã xảy ra lỗi ! Vui lòng thử lại")
        }
    })
}
ssstik("https://www.tiktok.com/@khanhngo2901/video/7123923044413869313?is_from_webapp=1&sender_device=pc").then(i => console.log(i))
