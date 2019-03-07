"use strict";

let browser = {
    get_keyword: function () {
        const url = location.href;
        const have_keyword = url.match(/[?&]q=([^&]+)/)
        return have_keyword !== null ? have_keyword[1] : ''
    },
    save: async function (keyword) {
        let keywords = await this.get(location.host)
        if (!keywords) {
            keywords = []
        }
        keywords.push(keyword)
        await this.set({[location.host]: keywords})
    },
    get: function (key) {
        return new Promise((resolve) => {
            chrome.storage.local.get(key, (item) => {
                key ? resolve(item[key]) : resolve(item)
            });
        })
    },
    set: function (obj) {
        return new Promise((resolve) => {
            chrome.storage.local.set(obj, () => resolve())
        })
    }
}

export default browser