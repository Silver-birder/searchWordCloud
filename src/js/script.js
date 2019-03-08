import browser from "./content/script";

const keyword = browser.get_keyword()
if (keyword !== '') {
    browser.save(keyword);
}