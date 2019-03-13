import "../css/material.min.css"
import {storage} from "./content/script"

const clearButtonSelectorId = 'clear'
const tableSelectorId = 'tableTd'
const hostKey = 'www.google.com'

document.getElementById(clearButtonSelectorId).addEventListener('click', storage.clear, false)

// ストレージにあるキーワードをすべて取得
storage.get(hostKey).then(list => {
    if (!list) {return;}
    list.map(data => {
        const html = "<tr>" +
            "<td>" + data + "</td>" +
            "</tr>"
        document.getElementById(tableSelectorId).insertAdjacentHTML('afterbegin', html)
    })
})