// toy data about the number of cat sightings
const cats = [
    { breed: 'tabby', num_sightings: 10 },
    { breed: 'siberian', num_sightings: 15 },
    { breed: 'ragdoll', num_sightings: 5 },
    { breed: 'sphynx', num_sightings: 2 },
    { breed: 'bengal', num_sightings: 7 }
]

// svg dimensions
const width = 600, height = 400;
const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
}
const markWidth = width - margin.left - margin.right;
const markHeight = height - margin.top - margin.bottom;

// each object in our cat data has two properties: breed and num_sightings
// breed is categorical, and num_sightings is quantitative
//      this type of data could make for a good bar chart

// let's start by making two scale functions, one for the x axis and one for the y axis
// for now, let's assume we want the bars to be vertical, so breed will be on the x axis and num_sightings on the y axis (this will be inverted for your assignment)


// for the x axis, we want to map the name of the cat breed to an x position for each bar
// to do this, we can use the d3.scaleBand function
let xScale = d3.scaleBand();

// xScale doesn't yet know what the domain and range of the scale are
// // so, calling xScale on any input returns undefined
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// console.log(xScale('siberian')); 
/****************************************************************************************************************************/



// let's define our domain and range for xScale
// note that markWidth === 500
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// let catXDomain = cats.map(d => d.breed);
// let catXRange = [0, markWidth];
/****************************************************************************************************************************/



// note that the cats are in the same order as the original dataset
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// console.log(catXDomain);
/****************************************************************************************************************************/



// now we give this domain and range to xScale using the .domain() and .range() functions respectively
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// xScale.domain(catXDomain).range(catXRange);
/****************************************************************************************************************************/



// just to check that our scale is working correctly
// note that the output of xScale is the position corresponding to the left edge of the bar
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// cats.forEach(function(d) {
//     console.log(d.breed, xScale(d.breed));
// });
/****************************************************************************************************************************/



// for the y axis, we want to map the number of sightings to a y position for the top edge of the bar
// since num_sightings is quantitative, we can use d3.scaleLinear
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// let yScale = d3.scaleLinear();
/****************************************************************************************************************************/



// since we haven't defined the domain and range of yScale
// calling yScale just returns the input value, when the input value is a number
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// console.log(yScale(10));
/****************************************************************************************************************************/



// let's define our domain and range for yScale
// note that d3.max takes the data array as the first parameter, and a mapping callback function as the second parameter, and returns the maximum value in the mapped array
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// let catYDomain = [0, d3.max(cats, d => d.num_sightings)];
// // since the origin of the svg is at the top left, we need to reverse the order of the y range
// let catYRange = [markHeight, 0];
/****************************************************************************************************************************/



// just like with d3.scaleBand, we can use the .domain() and .range() functions to specify the domain and range
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// yScale.domain(catYDomain).range(catYRange);
/****************************************************************************************************************************/



// again, we can check that our scale is working as expected
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// cats.forEach(function(d) {
//     console.log(d.num_sightings, yScale(d.num_sightings));
// })
/****************************************************************************************************************************/



// now let's create our visualization

// first, we create the svg and set its width and height
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// let svg = d3.select(`#main`)
//             .append('svg')
//                 .attr('width', width)
//                 .attr('height', height);
/****************************************************************************************************************************/



// then we create a function to draw the bars (called drawBars)
// as usual, we bind the data to an empty selection, and then enter the selection and append (in this case, a rectangle for each bar)
// now, we can use xScale and yScale to map the cat properties to the correct value for the corresponding rectangle attributes
// note that the bottom of the bar should be the same for all bars, so we have to subtract the top of the bar (yScale(d.num_sightings)) from the markHeight variable
// also not that .bandwidth() is a function property of d3.scaleBand. It automatically computes the width of each bar based on the number of items in the domain and the maximum range value
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// function drawBars() {
//     svg.append('g')
//         .attr('transform', `translate(${margin.left},${margin.top})`)
//         .selectAll('.bar')
//             .data(cats)
//             .enter()
//                 .append('rect')
//                     .attr('class', 'bar')
//                     .attr('x', d => xScale(d.breed))
//                     .attr('y', d => yScale(d.num_sightings))
//                     .attr('width', xScale.bandwidth()) 
//                     .attr('height', d => markHeight - yScale(d.num_sightings));
// }
//
// drawBars();
/****************************************************************************************************************************/



// now this looks like what we would expect, where each bar represents a breed of cat and the height of the bar corresponds to the number of sightings.
// but what if we don't want the bars to touch?
// we can add padding to the xScale by using the .padding function
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// xScale.padding(0.4);
/****************************************************************************************************************************/



// to see this in action, we can rerun the code
// but first we'll need to clear the svg so we don't just draw the new bars on top of the old bars
// we can select everything in the svg using "*" and then call .remove() on this selection to remove all the elements in the selection
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// svg.selectAll('*').remove();
/****************************************************************************************************************************/



// now let's call drawBars again
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// drawBars();
/****************************************************************************************************************************/



// now let's draw the axes for the bar chart
// we can do this using d3.axisBottom, d3.axisLeft, d3.axisTop, and/or d3.axisRight as well as our corresponding scale
// we pass the corresponding axis to the .call() function property on a newly appended group (this way we can transform the group accordingly)

// note that we use axisLeft for the y scale here. However, you could use axisRight if you choose, but the translate would need to change accordingly.
// similarly we use axisBottom for the y scale, but you could use axisTop, for the x axis with the appropriate translate
// we can specify the number of ticks we want on the axis by using the .ticks() function, note that d3 uses the number of ticks as a suggestion and may override the number to make the visualization more "human-readable"
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// function drawAxes(x, y) {
//     let y_axis_transform = `translate(${margin.left}, ${margin.top})`,
//         x_axis_transform = `translate(${margin.left}, ${margin.top + markHeight})`;
//
//     svg.append('g')
//         .attr('transform', y_axis_transform)
//         .call(d3.axisLeft(y).ticks(4));
//
//     svg.append('g')
//         .attr('transform', x_axis_transform)
//         .call(d3.axisBottom(x));
// }
//
// drawAxes(xScale, yScale);
/****************************************************************************************************************************/



// what if we want to change the color of the bar according to the breed of cat (redundant encoding)?
// we can use another type of scale for categorical variables d3.scaleOrdinal()
// scaleOrdinal maps the domain to the range based on index. In other words, domain item i will be mapped to range item i
// if the domain has fewer elements than the range, then the remaining range elements are ignored
// if the domain has more elements than the range, then domain item i is mapped to range item (i % domain.length)
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// let colors = d3.schemeSet2;
// let colorScale = d3.scaleOrdinal().domain(cats.map(d => d.breed)).range(colors);
/****************************************************************************************************************************/



// we can print out the domain and range of our color scale by calling .domain() and .range() without parameters
// note that d3 has several built-in color scheme arrays (including d3.schemeSet2)
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// console.log(colorScale.domain(), colorScale.range());
/****************************************************************************************************************************/



// now we can update the colors of our bars
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// d3.selectAll('.bar').attr('fill', d => colorScale(d.breed));
/****************************************************************************************************************************/



// There are additional scales that you may wish to use in the creation of your visualizations
// we'll cover one more here: d3.scaleTime (this is useful for time series data)

// first let's define some toy data about the amount of rainfall over several days in March
// we'll use this data to create a line chart
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// const weather = [
//     { date: new Date(2024, 2, 5), inches_of_rain: 1.6 },
//     { date: new Date(2024, 2, 6), inches_of_rain: 2.5 },
//     { date: new Date(2024, 2, 7), inches_of_rain: 2.0 },
//     { date: new Date(2024, 2, 8), inches_of_rain: 1.2 },
//     { date: new Date(2024, 2, 9), inches_of_rain: 0.3 },
// ]
/****************************************************************************************************************************/



// now to create a time based scale, we similarly give .domain() an array of two elements, 
//      but in this case these elements are Javascript Date objects.
// d3.extent returns an array of two elements, the first element is the minimum value of the mapped array, and the second element is the maximum value of the mapped array
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// let timeScale = d3.scaleTime().domain(d3.extent(weather, d => d.date)).range([0, markWidth]);
/****************************************************************************************************************************/



// for our line chart, we will also need a y scale. We can use d3.scaleLinear again
// again note that the range is inverted for the y axis
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// let rainScale = d3.scaleLinear().domain([0, 3]).range([markHeight, 0]);
/****************************************************************************************************************************/



// let's clear the svg again before creating our line chart
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// svg.selectAll('*').remove();
/****************************************************************************************************************************/


// now let's create a function for our line (called drawLine)
// notice that for a line chart with a single line, we don't need to use selectAll
// instead, we append a path, and bind the weather data to the path using the .datum() function
//      .datum() tells d3 that the entire array should be binded to a single html element (in this case, the path)
// then, for the path's "d" attribute, we pass the function d3.line() where .x() and .y() take callback functions for the corresponding attribute
// we can call this function and the drawAxes function, passing the new x and y scales
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// function drawLine() {
//     svg.append('g')
//         .attr('transform', `translate(${margin.left},${margin.top})`)
//         .append('path')
//             .datum(weather)
//                 .attr('fill', 'none')
//                 .attr('stroke', 'lightsteelblue')
//                 .attr('stroke-width', 3)
//                 .attr('d', d3.line()
//                                 .x(d => timeScale(d.date))
//                                 .y(d => rainScale(d.inches_of_rain))
//                 )
//
// }
//
// drawLine();
// drawAxes(timeScale, rainScale);
/****************************************************************************************************************************/