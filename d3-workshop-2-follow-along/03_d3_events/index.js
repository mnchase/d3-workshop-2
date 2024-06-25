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
                    .attr('height', height);

// now we can add our circles to the visualization
svg.selectAll('.circle')
    .data(circleData)
        .enter()
        .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', 10)
            .style('fill', d => colorScale(d.text))
            // we can add an event handler to each of the circles by using the .on() function
            // notice that the html onclick property becomes .on('click', ... )
            // the second parameter we give to .on() is a callback function
            //          the first parameter of this callback function is an object with data about the event (called event)
            //          the second parameter of this callback function is an object with data about the specific data item (called d)
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
            // .on('click mouseout', function(event, d){
            //     console.log('clicked or moused out ');
            // })
/****************************************************************************************************************************/
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
            // .on('mouseover', function(event, d){
            //     console.log('moused over ');
            // })
/****************************************************************************************************************************/
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
            // .on('mouseout', function(event, d){
            //     console.log('moused out ');
            // })
/****************************************************************************************************************************/



/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// let tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
/****************************************************************************************************************************/