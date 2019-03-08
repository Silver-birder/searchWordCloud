import {storage, browser} from "./content/script";

async function update_storage_keyword(keyword) {
    let keywords = await storage.get(location.host)
    if (!keywords) {
        keywords = []
    }
    keywords.push(keyword)
    const obj = {
        [location.host]: keywords
    }
    await storage.set(obj)
}

const keyword = browser.search_keyword()
if (keyword) {
    update_storage_keyword(keyword).catch(value => {
        console.error(value)
    })
}