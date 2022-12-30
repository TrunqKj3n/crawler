const axios = require('axios');
const querystring = require('querystring');

class FreeFire {
    #headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'origin': 'https://napthe.vn',
        'Referer': 'https://napthe.vn/',
        'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36'
    }
    getCookiesDataDome() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: 'https://api-js.datadome.co/js/',
                headers: this.#headers,
                data: querystring.stringify({
                    eventCounters: [],
                    jsType: 'ch',
                    ddk: 'AE3F04AD3F0D3A462481A337485081',
                    Referer: 'https%3A%2F%2Fnapthe.vn%2Fapp',
                    request: '%2Fapp',
                    responsePage: 'origin',
                    ddv: '4.6.0'
                })
            }).then((res) => {
                if (res.data.cookie) {
                    resolve(res.data.cookie)
                }
                else {
                    reject('Không lấy được cookies')
                }
            })
        })
    }
    getInfoFreeFire(id) {
        return new Promise(async (resolve, reject) => {
            const datadome = await this.getCookiesDataDome()
            this.#headers['Cookie'] = datadome
            this.#headers['x-datadome-clientid'] = datadome.split('datadome=')[1].split(';')[0]
            axios({
                method: 'POST',
                url: 'https://napthe.vn/api/auth/player_id_login',
                headers: this.#headers,
                data: JSON.stringify({
                    "app_id": 100067,
                    "login_id": id,
                    "app_server_id": 0
                })
            }).then(({ data }) => {
                if (data.nickname) {
                    resolve({
                        author: 'Thiệu Trung Kiên',
                        results: data
                    })
                }
                else if ('error' in data) {
                    reject('ID không hợp lệ')
                }
                else {
                    console.log(data)
                    reject('Không lấy được thông tin')
                }
            }).catch((err) => {
                throw err;
            })
        })
    }
}

new FreeFire().getInfoFreeFire('123').then(console.log).catch(console.log)
