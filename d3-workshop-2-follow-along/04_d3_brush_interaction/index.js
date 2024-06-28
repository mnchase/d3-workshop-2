const circleData = [
    { x: 100, y: 200, text: 'A'},
    { x: 200, y: 100, text: 'B'},
    { x: 300, y: 200, text: 'C'}
];

// this scale maps the letters ['A', 'B', 'C'] to the first three elements in d3.schemeSet2: ["#66c2a5", "#fc8d62", "#8da0cb"]
const colorScale = d3.scaleOrdinal().domain(circleData.map(d => d.text)).range(d3.schemeSet2);

// width and height for our svg
const width = 600, height = 400;

// create an svg in the main div and give it a height and width attribute
let svg = d3.select('#main')
                .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .style('border', '1px solid black'); // we can add a border to the svg using the border css style
                                                         // this will be a useful reference when we create our brush interaction


// add the circles to the visualization
svg.selectAll('.circle')
    .data(circleData)
        .enter()
        .append('circle')
            .attr('class', 'circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', 10)
            .style('fill', d => colorScale(d.text));

// now we can create our brush interaction using d3.brush()
//      we can tell d3 the rectangular region where we would like the brush interaction to occur using .extent()
//              .extent() takes a 2x2 array as an argument
//              This 2x2 array has the form:
//                  [
//                      [leftEdge, rightEdge],
//                      [topEdge, bottomEdge]
//                  ]
//      d3.brush() also requires us to specify an event handler we pass to .on()
//          the valid events for our brush are "start", "brush", "end"
//              "start" corresponds to when we initially click our mouse
//              "brush" corresponds to when we are dragging the clicked mouse
//              "end" corresponds to when we let go of the clicked mouse
//          the callback function for d3.brush().on() has a single parameter "event"
//              this parameter contains a property called "selection" that contains the boundaries of the brushed selection
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
let brush = d3.brush()
                .extent([
                    [0, 0],
                    [width, height]
                ])
                .on('brush end', function(event){
		    
                    d3.selectAll('.circle').style('stroke', d => isBrushed(event.selection, d) ? 'black' : 'none');
                });
/****************************************************************************************************************************/

function isBrushed(selection, d) {
	if (selection === null) {return false;}
	let circleX = d.x
	let circleY = d.y

	let rightEdge = selection[1][0]
	let leftEdge = selection[0][0]
	let topEdge = selection[0][1]
	let bottomEdge = selection[1][1]

	if (circleX >= leftEdge && circleX <= rightEdge) {
		return true;
	}
	else return false;
}


// similar to how we call axes, we create a new group and call the brush on it
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
svg.append('g').call(brush)
/****************************************************************************************************************************/