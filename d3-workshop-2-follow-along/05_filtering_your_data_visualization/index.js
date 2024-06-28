const biomes = [
    { name: 'aquatic',   avg_temp_celsius: 10, annual_precipation_cm: 100 },
    { name: 'grassland', avg_temp_celsius: 15, annual_precipation_cm: 200 },
    { name: 'forest',    avg_temp_celsius: 5 , annual_precipation_cm: 400 },
    { name: 'desert',    avg_temp_celsius: 50, annual_precipation_cm: 50 },
    { name: 'tundra',    avg_temp_celsius: 5 , annual_precipation_cm: 60 }
]

const width = 600, height = 400;
const margin = {
    top: 50,
    bottom: 75,
    left: 75,
    right: 50
};
const markWidth = width - margin.left - margin.right;
const markHeight = height - margin.top - margin.bottom;

const svg = d3.select('#main').append('svg').attr('width', width).attr('height', height);

const xScale = d3.scaleLinear().domain([0, 60]).range([0, markWidth]);
const yScale = d3.scaleLinear().domain([0, 450]).range([markHeight, 0]);
const colorScale = d3.scaleOrdinal().domain(biomes.map(d => d.name)).range(d3.schemeSet2);

function drawDots(data) {
    let circleGroup = d3.select('#circlegroup');

    circleGroup.selectAll('*').remove();

    circleGroup.selectAll('.biome')
        .data(data)
        .enter()
            .append('circle')
                
                .attr('cx', d => xScale(d.avg_temp_celsius))
                .attr('cy', d => yScale(d.annual_precipation_cm))
                .attr('r', 5)
                .style('fill', d => colorScale(d.name));
}

function drawScatterPlot() {
    svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .attr('id', 'circlegroup');

    drawDots(biomes);

    svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(d3.axisLeft(yScale));
    
    svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top + markHeight})`)
        .call(d3.axisBottom(xScale));
    
    svg.append('text')
        .attr('x', margin.left/2)
        .attr('y', height/2)
        .style('font-size', '12pt')
        .style('text-anchor', 'middle')
        .text('Average Rainfall (in cm)')
        .attr('transform',  `rotate(-90,${margin.left/2},${height/2})`)
    
    svg.append('text')
        .attr('x', width/2)
        .attr('y', height - margin.bottom/2)
        .style('font-size', '12pt')
        .style('text-anchor', 'middle')
        .text('Average Temperature (in Celsius)')
}

drawScatterPlot();



/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
function filterData() {
   //  let cutoff = d3.select('#filter').property('value');
   //  console.log(biomes.filter(d => d.avg_temp_celsius <= cutoff))
   //  drawDots(biomes.filter(d => d.avg_temp_celsius <= cutoff))
   //  console.log()
    let biome = d3.select('#biomes').property('value')
    drawDots(biomes.filter(d => {
	if (biome === 'all') {
	    return true;
	}
	return d.name === biome
    }))
}
/****************************************************************************************************************************/



/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
function drawDots(data) {
    let circleGroup = d3.select('#circlegroup');

    let circles = circleGroup.selectAll('.biome').data(data);

    circles.enter()
            .append('circle')
                .merge(circles)
                .attr('class', 'biome')
                .attr('cx', d => xScale(d.avg_temp_celsius))
                .attr('cy', d => yScale(d.annual_precipation_cm))
                .attr('r', 5)
                .style('fill', d => colorScale(d.name));
  
    circles.exit().remove();
}
/****************************************************************************************************************************/