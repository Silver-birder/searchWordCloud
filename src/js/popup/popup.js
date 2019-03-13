"use strict";

import * as d3 from "d3";
import cloud from "d3-cloud"

export　const wordCloud = {
    calc_weight_keywords: function(keywords) {
        const unique_keywords = [...new Set(keywords)].map(keyword => {
            return {
                text: keyword,
                size: keywords.filter(value => {
                    return value == keyword
                }).length
            }
        });
        const countMax = d3.max(unique_keywords, function(d){ return d.size} );
        const sizeScale = d3.scaleLinear().domain([0, countMax]).range([10, 100]);
        return unique_keywords.map(keyword => {
            return {
                text: keyword.text,
                size: sizeScale(keyword.size),
            }
        })
    },
    start: function(keywords, selector) {
        const w = 600;
        const h = 600;
        function draw(words) {
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

        cloud().size([w, h])
            .words(keywords)
            .padding(5)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    },
};
