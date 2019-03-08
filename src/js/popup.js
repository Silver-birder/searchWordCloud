import * as d3 from "d3";
import cloud from "d3-cloud"
import browser from "./content/script"

const TARGET_ELEMENT_ID = '#cloud';

browser.get("www.google.com").then(keywords => {
    keywords = keywords
        .map(function(d) {
            return {text: d, size: 10 + Math.random() * 90};
        });

    cloud().size([200, 200])
        .words(keywords)
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();

    function draw(words) {
        const w = 200;
        const h = 200;
        d3.select(TARGET_ELEMENT_ID)
            .append("svg")
            .attr("class", "ui fluid image")
            .attr("viewBox", "0 0 " + w + " " + h )
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
})
