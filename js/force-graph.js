

var dimensions = document.getElementById("force-graph");


var width = dimensions.offsetWidth;

var height = dimensions.offsetHeight;

maxNodeSize = 50;

 
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
        .strength(-700 + -width)
        .distanceMax(700)
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

    //images, sizes, and id of me and technologies icons
    "nodes": [{ 
        "id": "8",
        "name": "ME",
        "img":  "images/me.png",
        "rad": 100
    }, {
        "id": "1",
        "name": "JohnnyFive",
        "img":  "images/j5-logo.png",
        "rad": 50
    }, {
        "id": "3",
        "name": "Python",
        "img":  "images/greensock-logo.svg",
        "rad": 50
    }, {
        "id": "4",
        "name": "CSS",
        "img":  "images/git-hub.png",
        "rad": 50
    }, {
        "id": "5",
        "name": "Adobe",
        "img":  "images/adobe-logo.png",
        "rad": 50
    }, {
        "id": "6",
        "name": "Javacript",
        "img":  "images/javascript-logo.png",
        "rad": 50
    }, {
        "id": "7",
        "name": "Web Designer",
        "img":  "images/python-pandas-logo.png",
        "rad": 50
    }, {
        "id": "9",
        "name": "ScrapyUI-UX Designer",
        "img":  "images/scrapy.png",
        "rad": 50
    }, {
        "id": "10",
        "name": "Arduino",
        "img":  "images/arduino-logo.png",
        "rad": 50
    }, {
        "id": "14",
        "name": "Python",
        "img":  "images/python-logo.png",
        "rad": 50
    }, {
        "id": "15",
        "name": "P5.js",
        "img":  "images/p5js.png",
        "rad": 50
    }, {
        "id": "16",
        "name": "HTML",
        "img":  "images/html-logo.png",
        "rad": 50
    }, {
        "id": "17",
        "name": "CSS",
        "img":  "images/css-logo.png",
        "rad": 50
    }, {
        "id": "18",
        "name": "C4D",
        "img":  "images/c4d-logo.png",
        "rad": 50
    }, {
        "id": "20",
        "name": "Node",
        "img":  "images/node-logo.png",
        "rad": 60
    },{
        "id": "21",
        "name": "Charts.js",
        "img":  "images/charts-js.png",
        "rad": 60
    },{
        "id": "22",
        "name": "Tableau",
        "img":  "images/tableau-logo.png",
        "rad": 60
    },{
        "id": "23",
        "name": "D3.js",
        "img":  "images/d3-logo.png",
        "rad": 60
    },],


    //links connect technologies and I to eachother relevantly

    "links": [{
        "source": "23",
        "target": "6",
        "value": 4

    }, {
        "source": "22",
        "target": "8",
        "value": 4

    }, {
        "source": "21",
        "target": "6",
        "value": 4

    }, {
        "source": "20",
        "target": "6",
        "value": 4

    }, {
        "source": "18",
        "target": "8",
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

    },{
        "source": "8",
        "target": "14",
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

    },{
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