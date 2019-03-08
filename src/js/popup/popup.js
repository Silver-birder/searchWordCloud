"use strict";

import * as d3 from "d3";
import cloud from "d3-cloud"

export　let wordCloud = {
    calc_weight_keywords: function(keywords) {
        return [...new Set(keywords)].map(keyword => {
            return {
                text: keyword,
                size: keywords.filter(value => {
                    return value == keyword
                }).length
            }
        });
    },
    start: function(keywords, selector) {
        function draw(words, selector) {
            const w = 200;
            const h = 200;
            d3.select(selector)
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

        cloud().size([200, 200])
            .words(keywords)
            .padding(5)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw(keywords, selector))
            .start();

    },
};
