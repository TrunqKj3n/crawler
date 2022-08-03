const cheerio = require("cheerio"),
    axios = require("axios");

function soundcloud(url) {
    return new Promise((async (resolve, reject) => {
        if (!url) reject("Vui lòng nhập url!")
        const res = await axios({
            method: "post",
            url: "https://www.klickaud.co/download.php",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: {
                value: url
            }
        }),
            $ = cheerio.load(res.data);
        resolve({
            imageSrc: $('tr[class="mobtable2"]').find("td").find("img").attr("src"),
            songName: $('tr[class="mobtable2"]').find("td:nth-child(2)").text(),
            Quality: $('tr[class="mobtable2"]').find("td:nth-child(3)").text(),
            urlSong: $(".large-centered").find("div[id=dlMP3]").attr("onclick")
                .split("downloadFile")[1]
                .split(",")[0]
                .replace("(", "")
                .replace("'", "")
                .replace("'", "")
        })
    }))
}
soundcloud();
