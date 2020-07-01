//consider a javascript greeting dependant on time of day

var dimensions = document.getElementById("force-graph");

var width = dimensions.offsetWidth;

var height = dimensions.offsetHeight;

maxNodeSize = 50;

//companies, job titles (alumni), back end, front end, framework tech  
var svg = d3.select("#force-graph")
    .append('svg')
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) {
        return d.id;
    }))
    .force('charge', d3.forceManyBody()
        .strength(-850)
        .distanceMax(900)
    )
    .force("center", d3.forceCenter(width / 2, height / 2));



function buildDiagram(graph) {
    

    var link = svg.append("g")
        .style("stroke", "black")
        .style("stroke-width", ".5px")
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
        .attr("x", function(d) { return -38;})
        .attr("y", function(d) { return -38;})
        .attr("height", function(d) { return d.rad;})
        .attr("width", function(d) { return d.rad;})
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

  
        
    //create SVG labels from text values
    

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
        "group": 3,
        "name": "JohnnyFive",
        "img":  "images/j5-logo.png",
        "rad": 60
    }, {
        "id": "2",
        "group": 3,
        "name": "After Effects",
        "img":  "images/after-effects-logo.png",
        "rad": 60
    }, {
        "id": "3",
        "group": 3,
        "name": "Python",
        "img":  "images/greensock-logo.svg",
        "rad": 60
    }, {
        "id": "4",
        "group": 4,
        "name": "CSS",
        "img":  "images/git-hub.png",
        "rad": 60
    }, {
        "id": "5",
        "group": 2,
        "name": "Adobe",
        "img":  "images/adobe-logo.png",
        "rad": 60
    }, {
        "id": "6",
        "group": 2,
        "name": "Javacript",
        "img":  "images/javascript-logo.png",
        "rad": 60
    }, {
        "id": "7",
        "group": 2,
        "name": "Web Designer",
        "img":  "images/python-pandas-logo.png",
        "rad": 60
    }, {
        "id": "8",
        "group": 2,
        "name": "ME",
        "img":  "images/me.png",
        "rad": 125
    }, {
        "id": "9",
        "group": 2,
        "name": "ScrapyUI-UX Designer",
        "img":  "images/scrapy.png",
        "rad": 60
    }, {
        "id": "10",
        "group": 2,
        "name": "Arduino",
        "img":  "images/arduino-logo.png",
        "rad": 60
    }, {
        "id": "11",
        "group": 3,
        "name": "Python Pandas",
        "img":  "images/adobe-premier-logo.png",
        "rad": 60
    }, {
        "id": "12",
        "group": 3,
        "name": "Illustrator",
        "img":  "images/illustrator-logo.png",
        "rad": 60
    }, {
        "id": "13",
        "group": 3,
        "name": "Photoshop",
        "img":  "images/photoshop-logo.png",
        "rad": 60
    }, {
        "id": "14",
        "group": 2,
        "name": "Python",
        "img":  "images/python-logo.png",
        "rad": 60
    }, {
        "id": "15",
        "group": 6,
        "name": "P5.js",
        "img":  "images/p5js.png",
        "rad": 60
    }, {
        "id": "16",
        "group": 6,
        "name": "HTML",
        "img":  "images/html-logo.png",
        "rad": 60
    }, {
        "id": "17",
        "group": 6,
        "name": "CSS",
        "img":  "images/css-logo.png",
        "rad": 60
    }, {
        "id": "18",
        "group": 6,
        "name": "C4D",
        "img":  "images/c4d-logo.png",
        "rad": 60
    }, {
        "id": "19",
        "group": 6,
        "name": "Shopify",
        "img":  "images/shopify-logo.png",
        "rad": 60
    }],


    "links": [{
        "source": "19",
        "target": "8",
        "value": 4

    }, {
        "source": "18",
        "target": "8",
        "value": 4

    }, {
        "source": "6",
        "target": "17",
        "value": 4

    }, {
        "source": "6",
        "target": "16",
        "value": 4

    }, {
        "source": "17",
        "target": "16",
        "value": 4

    }, {
        "source": "17",
        "target": "8",
        "value": 4

    }, {
        "source": "16",
        "target": "8",
        "value": 4

    }, {
        "source": "8",
        "target": "10",
        "value": 4

    }, {
        "source": "4",
        "target": "8",
        "value": 4

    }, {
        "source": "6",
        "target": "15",
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
        "source": "6",
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
        "source": "1",
        "target": "6",
        "value": 4
    }, {
        "source": "1",
        "target": "10",
        "value": 4
    }]
}

//run the main function and pass our data container
buildDiagram(graph);