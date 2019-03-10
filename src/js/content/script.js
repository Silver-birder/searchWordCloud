"use strict";

export　let storage = {
    get: function (key) {
        return new Promise((resolve) => {
            chrome.storage.sync.get(key, (item) => {
                key ? resolve(item[key]) : resolve(item)
            });
        })
    },
    set: function (obj) {
        return new Promise((resolve) => {
            chrome.storage.sync.set(obj, () => resolve())
        })
    }
};

export　let browser = {
    　search_keyword: function() {
         const url = location.href;
         const match_keyword = url.match(/[?&]q=([^&]+)/);
         if (match_keyword === null) { return ''; }
         const keyword = match_keyword[1]
         const split_keywords = keyword.split('+') // for google search multi keywords
         const decode_keywords = split_keywords.map(value => {
             return decodeURIComponent(value)
         })
         return decode_keywords
     }
};