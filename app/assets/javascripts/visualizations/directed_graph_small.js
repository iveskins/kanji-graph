$(document).ready(function(){

  var width = 960,
      height = 500;

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .charge(-160)
      .linkDistance(30)
      .linkStrength(.9)
      .size([width, height]);

  var tip2 = d3.tip()
    .attr('class', 'd3-tip')
    .html("<p>Hello world!</p>");

  var svg = d3.select("#directed_graph_small").append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(tip2);


  // !!! Diagram's position on page
  var group = svg.append("g")
    .attr("transform", "translate(-100, 0)")
  /*
    svg.append("defs").append("marker")
    .attr("id", "end_marker")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", -1)
    .attr("markerWidth", 3)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5");
      
  //marker.append("circle")
   // .attr("cx", 6)
    //.attr("cy", 6)
    //.attr("r", 5);
  */

  d3.json("surnames/directed_graph_small", function(error, graph) {
    var nodes = graph.nodes.slice(),
        links = [],
        bilinks = [];

    graph.links.forEach(function(link) {
      var s = nodes[link.source],
          t = nodes[link.target],
          i = {}; // intermediate node
      nodes.push(i);
      links.push({source: s, target: i}, {source: i, target: t});
      bilinks.push([s, i, t]);
    });

    force
        .nodes(nodes)
        .links(links)
        .start();

    var link = group.selectAll(".link")
        .data(bilinks)
      .enter().append("path")
        .attr("class", "link")
        .attr("marker-end", "url(#end_marker)");

    /* 
     * <circle class="node" r="12" style="fill: rgb(255, 255, 255);"></circle>
     * <text y="5" style="color: rgb(75, 75, 75); text-anchor: middle;">田</text>
     * <circle class="node" r="12" style="fill: rgba(255, 255, 255, 0); stroke: rgb(75, 75, 75);"></circle> */

    var node = group.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g");
    var background = node.append("circle")
          .attr("r", 12)
          .style("fill", "white")
    var text = node.append("text")
          .attr("y", "5")
          .style("color", "#4b4b4b")
          .style('text-anchor', 'middle')
          .text(function(d) { return d.name; });
    var circle = node.append("circle")
          .attr("class", "node")
          .attr("r", 12)
          .style("fill", "rgba(255, 255, 255, 0)")
          .style("stroke", "#4b4b4b");
    node.call(force.drag)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);



    //node.append("title")
    //    .text(function(d) { return d.name; });


    force.on("tick", function() {
      link.attr("d", function(d) {
        return "M" + d[0].x + "," + d[0].y
            + "S" + d[1].x + "," + d[1].y
            + " " + d[2].x + "," + d[2].y;
      });
      node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    });
  });

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html("<p>Hello world!</p>")
    .offset([100,0]);
  window.out_tip = tip

  var tip3 = d3.tip()
    .attr('class', 'd3-tip')
    .html("<p>Hello Michael!</p>")
    .offset([100,0]);

  window.our_tip3 = tip3

  var vis = d3.select(document.body)
    .append('svg')
    .call(tip3);

    /*
  vis.append('rect')
    .attr('width', 20)
    .attr('height', 20)
    // Show and hide the tooltip
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
    */

});
