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
         const have_keyword = url.match(/[?&]q=([^&]+)/);
         return have_keyword !== null ? have_keyword[1] : ''
     }
};