//consider a javascript greeting dependant on time of day

var dimensions = document.getElementById("force-graph");

var width = dimensions.offsetWidth;

var height = dimensions.offsetHeight * .98;

maxNodeSize = 50;
//imports in a colour palette as an array
var color = d3.scaleOrdinal(d3.schemeCategory20b)
    .domain([1, 2, 3, 4, 5, 6])
    .range(["#011638", "#d33f49", "#eec643", "#68B3A2", "#429b40", "#1880a0"]);
//companies, job titles (alumni), back end, front end, framework tech  
var svg = d3.select("#force-graph")
    .append('svg')
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#F2F3F0");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) {
        return d.id;
    }))
    .force('charge', d3.forceManyBody()
        .strength(-650)
        .distanceMax(10000)
    )
    .force("center", d3.forceCenter(width / 2, height / 2));


function buildDiagram(graph) {
    

    var link = svg.append("g")
        .style("stroke", "#C0C9CC")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line");

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)

        
        
    //setting static properties and attaching event listeners when circles are created
    .enter()
        .append("svg:image")
        .attr("xlink:href",  function(d) { return d.img;})
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 50)
        .attr("width", 50)
        .style("stroke", "#424242")
        .style("stroke-width", "0px")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

           
        
    //create SVG labels from text values
    var label = svg.append("g")
        .selectAll("text")
        .data(graph.nodes)
        .enter()
        .append("text")
        .text(function(d) {
            return d.name;
        });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);


        

    function ticked() {
        link
            .attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });

        node
      
           
            .attr("r", function(d) {
            return d.rad + 6;
 
        })
        
       

        .attr("cx", function(d) {
                return d.x + 5;
            })
            .attr("cy", function(d) {
                return d.y - 3;
            })

        .attr("transform", function(d) {
            d.x =  Math.max(maxNodeSize, Math.min(width - (d.imgwidth/2 || 16), d.x));
            d.y =  Math.max(maxNodeSize, Math.min(height - (d.imgheight/2 || 16), d.y));
            return "translate(" + d.x + "," + d.y + ")";
        });

        label
            .attr("x", function(d) {
                return d.x + 18;
            })
            .attr("y", function(d) {
                return d.y + 25;
            })
            .style("font-size", "13px").style("fill", "#444")
            .style("font-family", 'akzidenz-grotesk_bqregular');
    }
    
}



   
function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
}

function dragged(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
}

function dragended(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
    if (!d3.event.active) simulation.alphaTarget(0);
}




var graph = {
    "nodes": [{
        "id": "1",
        "group": 4,
        "name": "JavaScript",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/thanos.png",
        "rad": 12
    }, {
        "id": "2",
        "group": 3,
        "name": "PHP",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/magneto.png",
        "rad": 12
    }, {
        "id": "3",
        "group": 3,
        "name": "Python",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/ronan.png",
        "rad": 12
    }, {
        "id": "4",
        "group": 4,
        "name": "CSS",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/redskull.png",
        "rad": 15
    }, {
        "id": "5",
        "group": 2,
        "name": "Back End Developer",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/mystique.png",
        "rad": 15
    }, {
        "id": "6",
        "group": 2,
        "name": "Front End Developer",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/drdoom.png",
        "rad": 15
    }, {
        "id": "7",
        "group": 2,
        "name": "Web Designer",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png",
        "rad": 9
    }, {
        "id": "8",
        "group": 2,
        "name": "ME",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainmarvel.png",
        "rad": 18
    }, {
        "id": "9",
        "group": 2,
        "name": "UI-UX Designer",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png",
        "rad": 9
    }, {
        "id": "10",
        "group": 2,
        "name": "Full Stack Developer",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_blackwidow.png",
        "rad": 15
    }, {
        "id": "11",
        "group": 3,
        "name": "Python Pandas",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_daredevil.png",
        "rad": 12
    }, {
        "id": "12",
        "group": 3,
        "name": "Python Web Scraping",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_wolverine.png",
        "rad": 12
    }, {
        "id": "13",
        "group": 3,
        "name": "Python Flask",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainamerica.png",
        "rad": 12
    }, {
        "id": "14",
        "group": 2,
        "name": "Design Lead",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_ironman.png",
        "rad": 15
    }, {
        "id": "15",
        "group": 6,
        "name": "Drupal",
        "img":  "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_thor.png",
        "rad": 15
    }],


    "links": [{
        "source": "8",
        "target": "10",
        "value": 4

    }, {
        "source": "4",
        "target": "7",
        "value": 4

    }, {
        "source": "10",
        "target": "15",
        "value": 4

    }, {
        "source": "15",
        "target": "6",
        "value": 4

    }, {
        "source": "8",
        "target": "6",
        "value": 4

    }, {
        "source": "8",
        "target": "5",
        "value": 4

    }, {
        "source": "8",
        "target": "5",
        "value": 4

    }, {
        "source": "8",
        "target": "14",
        "value": 4

    }, {
        "source": "5",
        "target": "13",
        "value": 4

    }, {
        "source": "5",
        "target": "1",
        "value": 4

    }, {
        "source": "5",
        "target": "2",
        "value": 4

    }, {
        "source": "14",
        "target": "9",
        "value": 4

    }, {
        "source": "14",
        "target": "7",
        "value": 4

    }, {
        "source": "10",
        "target": "3",
        "value": 4

    }, {
        "source": "5",
        "target": "11",
        "value": 4

    }, {
        "source": "5",
        "target": "12",
        "value": 4

    }, {
        "source": "6",
        "target": "4",
        "value": 4

    }, {
        "source": "10",
        "target": "13",
        "value": 4

    }, {
        "source": "10",
        "target": "1",
        "value": 4

    }]
}

//run the main function and pass our data container
buildDiagram(graph);