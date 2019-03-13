import "../css/popup.css";

import {wordCloud} from "./popup/popup";
import {storage} from "./content/script";

const TARGET_ELEMENT_ID = '#cloud';
const KEY = 'www.google.com';

storage.get(KEY).then(keywords => {
    if (!keywords) { return; }
    const calculated_keywords = wordCloud.calc_weight_keywords(keywords)
    wordCloud.start(calculated_keywords, TARGET_ELEMENT_ID)
})