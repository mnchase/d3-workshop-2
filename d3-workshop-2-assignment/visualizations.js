const shows = [
    "All",
    "The Haunting of Hill House", 
    "The Haunting of Bly Manor", 
    "Midnight Mass", 
    "The Midnight Club", 
    "The Fall of the House of Usher"
];

// dimensions of the scatter plot and bar chart
const scatterWidth = 600, scatterHeight = 400;
const barWidth = 600
// barHeight will be updated when the user brushes the scatter plot
let barHeight = 1200;

// leftSvg contains the svg you will use to create the scatter plot
const leftSvg  = d3.select('#left').append('svg').attr('width', scatterWidth).attr('height', scatterHeight);
// rightSvg contains the svg you will use to create the bar chart
let rightSvg =  d3.select('#right').append('svg').attr('width', barWidth);

// margin for scatter plot
const scatterMargin = {
    top: 50,
    bottom: 65,
    left: 50,
    right: 50
};
// margin for bar chart
const barMargin = {
    top: 50,
    bottom: 50,
    left: 150,
    right: 50
};

// height of each bar including padding between bars
// this value is updated in the makeVisualizations function
// you can use this value when changing the height of the bar chart in updateBars
let heightOfEachBar = undefined;

// width and height of the scatter plot excluding margins
const scatterWidthPadded = scatterWidth - (scatterMargin.left + scatterMargin.right);
const scatterHeightPadded = scatterHeight - (scatterMargin.top + scatterMargin.bottom);

// width of the scatter plot excluding margins
const barWidthPadded = barWidth - (barMargin.left + barMargin.right);

// an array of colors you can use for your color scale
const colors = d3.schemeSet2;

// scale function that maps each show to a color
/
const colorDomain = shows.filter(d => d != 'All');
const colorRange = colors;
const colorScale = d3.scaleOrdinal().domain(colorDomain).range(colorRange);

// scale function that maps the actors age to an x coordinate on the scatter plot
/
const scatterXDomain = [0, 100];
const scatterXRange = [0, scatterWdthPadded];
const scatterXScale = d3.scaleLinear().domain(scatterXDomain).range(scatterXRange);

// scale function that maps the number of episodes to a y coordinate on the scatter plot
/
const scatterYDomain = [0, 10];
const scatterYRange = [scatterHeightPadded, 0];
const scatterYScale = d3.scaleLinear().domain(scatterYDomain).range(scatterYRange);

// scale function that maps the total number of episodes to an x coordinate on the bar chart
const barXDomain = [0, 40];
const barXRange = [0, barWidthPadded];
const barXScale = d3.scaleLinear().domain(barXDomain).range(barXRange);

// scale function that will map the name of the actor to a y coordinate on the bar chart
let barYScale = d3.scaleBand().padding(0.4).align(0.5);

// html div element that you will use in your hover interaction for the scatter plot
/
const scatterTooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

/*****************************************************************************************************************************/
/*********************************** EXTRA CREDIT (1): Create a tooltip for the bar chart  ***************************************/
/*****************************************************************************************************************************/

// function you will call to update the bar chart each time the scatter plot is brushed
// this function is also initially called in drawBarChart 
function updateBars(data) {
    // compute the height of the bar chart based on the number of actors that were selected by the brush
    barHeight = heightOfEachBar*data.length + barMargin.top + barMargin.bottom;
    
    /**************************************************************************************************************************************/
    /************************* TODO: Set the bar chart's height attribute to the computed "barHeight" value *******************************/
    /**************************************************************************************************************************************/

    // compute the height of the bar chart excluding margins
    let barHeightPadded = barHeight - (barMargin.top + barMargin.bottom);

    // update the domain of the y scale function to map the sorted actor names to a y coordinate on the bar chart
    let barYDomain = data.map(d => d.actor).sort();
    let barYRange = [barHeightPadded,0];
    barYScale.domain(barYDomain).range(barYRange);

    // since we redefined the y scale function's domain, we need to remove all of the existing bars and start over
    // select the elements containing the bar class (we will create these later) and give them an empty data object
    let bars = rightSvg.selectAll(`.bar`).data([]);

    // use exit and remove to remove all of the existing bars
    bars.exit().remove();

    // now we can add the new bars we want to display
    /**************************************************************************************************************************************/
    /************************* TODO: Select the elements containing the bar class and give them the data object ***************************/
    /************************* Hint: the parameter of updateBars called "data" may be useful                    ***************************/
    /************************* NOTE: Make sure to update the bars variable with your new selection              ***************************/
    /**************************************************************************************************************************************/
    bars = undefined;

    // enter the data and append a rectangle for each data element with the necessary attributes
    bars.enter()
            .append('rect')
                .attr('transform', `translate(${barMargin.left},${barMargin.top})`)
                .attr('class', 'bar')
                .attr('x', 0)
                /*****************************************************************************************************************************/
                /***************************** TODO: Update the y, width, and height attributes of the bars **********************************/
                /*****************************************************************************************************************************/
                .attr('fill', 'lightgrey')
                /*****************************************************************************************************************************/
                /***************************** EXTRA CREDIT (1): Add hover functionality to the bars  ****************************************/
                /*****************************************************************************************************************************/

    // remove the existing y axis
    d3.select('#y_axis').remove()

    // draw the new y axis inside of a group using d3.axisLeft and barYScale, set the number of ticks for the axis to 5
    rightSvg.append('g')
        .attr('id', 'y_axis')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + barMargin.left + ',' + barMargin.top + ')')
        .call(d3.axisLeft(barYScale).ticks(5));
}

function drawBarChart() {
    // call the updateBars function with the global actors variable
    updateBars(actors)

    let xAxisTransform = 'translate(' + barMargin.left + ',' + (barMargin.top) + ')';
    /**************************************************************************************************************************************/
    /****************************** TODO: Draw the x axis inside of a group using d3.axisTop and barXScale ********************************/
    /**************************************************************************************************************************************/

    // add a label to the x axis by appending a text element
    rightSvg.append('g')
        .append('text')
            .text('Total Number of Episodes')
            .attr('class', 'x label')
            .attr('x', barMargin.left + barWidthPadded/2)
            .attr('y', barMargin.top/2)
            .style('text-anchor', 'middle')
}  

// this function checks whether a point "d" is brushed (i.e., within the "extent" of the brush selection)
function isBrushed(extent, d) {
    // if the extent is empty (when the user clicks and doesn't drag), we want all points to be selected, so we return true
    if(!extent) return true;

    // x and y coordinates of the point "d" on the svg
    let pointX = scatterXScale(d.age) + scatterMargin.left,
        pointY = scatterYScale(d.number_of_episodes) + scatterMargin.top

        // x coordinate for the leftmost edge of the brush selection
    let brushRegionLeftX = extent[0][0],
        // y coordinate for the topmost edge of the brush selection
        brushRegionTopY = extent[0][1],
        // x coordinate for the rightmost edge of the brush selection
        brushRegionRightX = extent[1][0],
        // y coordinate for the bottommost edge of the brush selection
        brushRegionBottomY = extent[1][1]

    /**************************************************************************************************************************************/
    /******** TODO: Return a boolean expression that is "true" if and only if the point "d" is within the brush selection *****************/
    /**************************************************************************************************************************************/
}

function drawScatterPlot(data) {    
    /**************************************************************************************************************************************/
    /****************************** EXTRA CREDIT (2): Remove all elements from the scatter plot *******************************************/
    /**************************************************************************************************************************************/

    // create a brush object using d3.brush
    let brush = d3.brush()
                    // set the edges of the brush region (offset by the left and top margins)
                    .extent([
                        [scatterMargin.left, scatterMargin.top],
                        [scatterMargin.left + scatterWidthPadded, scatterMargin.top + scatterHeightPadded]
                    ])
                    // create a handler for what happens when the brush is brushing and when it finishes brushing
                    .on('brush end', function(event){
                        /**************************************************************************************************************************************/
                        /******** TODO: Create a function that sets the color of the selected points to the appropriate color using colorScale ****************/
                        /********       This function should set the color of points that were not selected to "lightgrey"                     ****************/
                        /**************************************************************************************************************************************/
                        let colorHandler = undefined;
                        
                        // select all of the dots on the scatter plot and set their fill style to colorHandler
                        d3.selectAll('.actorDot').style('fill', colorHandler)

                        // get the names of the characters that were selected by the brush
                        let brushed_character_names = d3.selectAll('.actorDot').data()
                                                        .filter(d => isBrushed(event.selection, d))
                                                        .map(d => d.actor)
                        
                        // filter the actors that were selected by the brush
                        let brushed_actors = actors.filter(d => brushed_character_names.includes(d.actor))
                        
                        // update the bar chart with the filtered actors
                        updateBars(brushed_actors)
                    })
    
    /**************************************************************************************************************************************/
    /********************************* TODO: Call the brush within a group we append to the scatter plot **********************************/
    /**************************************************************************************************************************************/

    
    // create a group for each of the characters in our data object
    let characterGroup = leftSvg.selectAll('.characterGroup')
                            .data(data)
                            .enter()
                                .append('g')
                                    .attr('class', 'characterGroup')
                                    .attr('transform', `translate(${scatterMargin.left},${scatterMargin.right})`)
    
    // nest circles within each group for the actors that play each character
    let actorGroup = characterGroup.selectAll('.actorDot')
                            .data(function(d) {
                                return d.played_by.map(function(e){
                                    return {
                                        /*********************************************************************************************************************/
                                        /*************** TODO: Set the attributes of this object (name, actor, age, number_of_episodes, from) ****************/
                                        /*************** Hint: These attributes may rely on "d" or "e"                                        ****************/
                                        /*********************************************************************************************************************/
                                    }
                                })
                            })
                            .enter()
                                .append('circle')
                                    .attr('class', 'actorDot')
                                    .attr('cx', d => scatterXScale(d.age))
                                    .attr('cy', d => scatterYScale(d.number_of_episodes))
                                    .attr('r', 4)
                                    // create an event handler that shows a tooltip when the user mouses over a dot
                                    .on('mouseover', function(event, d){
                                        /***********************************************************************************************/
                                        /*************** TODO: Transition the radius of "this" dot to have a value of 6 ****************/
                                        /***********************************************************************************************/

                                        // change the color of the tooltip background using colorScale and the from attribute of this dot
                                        scatterTooltip.style('background', colorScale(d.from))
                                        
                                        /***********************************************************************************************/
                                        /*************** TODO: Transition the opacity of the tooltip to have a value of .9 *************/
                                        /***********************************************************************************************/

                                        /***********************************************************************************************/
                                        /***** TODO: Set the html of the tooltip to have a list of labels of the dot's attributes      */
                                        /***** TODO: Style the left of the tooltip to be the x position where the mouse event occurred */
                                        /***** TODO: Style the top of the tooltip to be the y position where the mouse event occurred  */
                                        /***********************************************************************************************/
                                    })
                                    // create an event handler that hides the tooltip when the user mouses away from the dot
                                    .on('mouseout', function(event){
                                        // transition the radius of "this" dot to have a value of 6
                                        d3.select(this).transition().attr('r', 4)
                                        
                                        // transition the opacity of hte tooltip back to a value of 0
                                        scatterTooltip.transition().style('opacity', 0);
                                    })
                                    // make the dots half see-through
                                    .style('opacity', 0.5)
                                    /***********************************************************************************************/
                                    /********** TODO: Set the color of the dots using colorScale according to the tv show **********/
                                    /***********************************************************************************************/
                       
    // draw the x axis inside of a group using d3.axisBottom and scatterXScale, set the number of ticks to 5
    let xAxisTransform = 'translate(' + scatterMargin.left + ',' + (scatterHeight - scatterMargin.bottom) + ')';
    leftSvg.append('g')
        .attr('class', 'x axis')
        .attr('transform', xAxisTransform)
        .call(d3.axisBottom(scatterXScale).ticks(5));
    
    // draw the y axis inside of a group using d3.axisLeft and scatterYScale, set the number of ticks to 5
    let yAxisTransform = 'translate(' + scatterMargin.left + ',' + scatterMargin.top + ')';
    leftSvg.append('g')
        .attr('class', 'y axis')
        .attr('transform', yAxisTransform)
        .call(d3.axisLeft(scatterYScale).ticks(5));

    // add a label to the x axis
    leftSvg.append('g')
        .append('text')
            .text('Actor Age')
            .attr('class', 'x label')
            .attr('x', scatterMargin.left + scatterWidthPadded/2)
            .attr('y', scatterHeight - scatterMargin.bottom/2)
            .style('text-anchor', 'middle')
    
    // add a rotated label to the y axis
    let yLabelTransform = `rotate(-90,${scatterMargin.left/2},${scatterMargin.top + scatterHeightPadded/2})`;
    leftSvg.append('g')
        .append('text')
            .text('Number of Episodes')
            .attr('class', 'x label')
            .attr('transform', yLabelTransform)
            .attr('x', scatterMargin.left/2)
            .attr('y', scatterMargin.top + scatterHeightPadded/2)
            .style('text-anchor', 'middle')
}

function makeVisualizations() {
    // height of each bar including padding between bars
    heightOfEachBar = (barHeight - (barMargin.top + barMargin.bottom)) / actors.length;
    
    /*****************************************************************************************************************************/
    /*********** EXTRA CREDIT (2): Add an html form to the div with id "form"                                              *******/
    /*********** EXTRA CREDIT (2): Add a select html element to the form with a "change" event handler                     *******/ 
    /***********                   that updates the scatter plot and bar chart to only                                     *******/
    /***********                   display dots from the selected tv show                                                  *******/
    /*********** EXTRA CREDIT (2): Add an html form to the div with id "form"                                              *******/
    /*********** EXTRA CREDIT (2): Add options to the select for each of the tv shows in the show object defined on line 1 *******/
    /*********** EXTRA CREDIT (2): Add a label for the dropdown                                                            *******/
    /*****************************************************************************************************************************/
    let filterForm = undefined;
    let dropDown = undefined;
    

    // call functions to draw the scatter plot and bar chart for the first time
    drawScatterPlot(characters)
    drawBarChart()
}