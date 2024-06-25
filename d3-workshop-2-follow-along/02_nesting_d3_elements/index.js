// nested data array about stocks
// each element is an object representing stock sectors (e.g., TECHNOLOGY, FOOD & DRINK, AIRLINES)
// each of these objects contains a property called "value" which refers to an array
// each of the elements in this nested array is an object representing a specific company stock (e.g., MSFT, IBM, AAPL)
const stockData = [
    {key: 'TECHNOLOGY', pos: [200, 105], value: {
        total: 397.08,  companies: [
            {company: "MSFT", price: 77.74, pos: [-60, 0], color: '#85b623'},
            {company: "IBM", price: 159.48, pos: [12, -48], color: '#236cb0'},
            {company: "AAPL", price: 159.86, pos: [15, 45], color: '#666666'}
        ]}
    },
    {key: 'FOOD & DRINK', pos: [85, 290], value: {
        total: 266.78, companies: [
            {company: "KO", price: 46.47, pos: [50, 0], color: '#e32232'},
            {company: "MCD", price: 165.07, pos: [-18, -20], color: '#fed430'},
            {company: "SBUX", price: 55.24, pos: [20, 45], color: '#0e7042'}
        ]}
    },
    {key: 'AIRLINES', pos: [320, 290], value: {
        total: 183.51, companies: [
            {company: "DAL", price: 52.88, pos: [0, -35], color: '#980732'},
            {company: "AAL", price: 51.95, pos: [35, 10], color: '#1f98ce'},
            {company: "JBLU", price: 20.08, pos: [7, 45], color: '#101e40'},
            {company: "LUV", price: 58.60, pos: [-35, 15], color: '#d81f2a'}
        ]}
    }
];

// first, we create the svg with width 600 and height 400
let svg = d3.select(`#main`)
            .append('svg')
                .attr('width', 600)
                .attr('height', 400);

// we are going to create circles to represent the types of stocks as well as the individual stocks themselves
// the size of these circles will depend on the "price" and "total" properties
// so, we create a scale that maps from the domain [0, d3.max(stockData, d => d.value.total)] === [0, 397.08]
// to the range [0,50] (feel free to change 50 to a larger or smaller circle radius)
let radiusScale = d3.scaleLinear().domain([0, d3.max(stockData, d => d.value.total)]).range([0,50]);

// create a variable called sectorG
// sectorG selects all elements with the class "sector"
//         binds the stockData to this selection
//         enters and appends a group for each of the stockData objects (these will be the stock sectors)
//              each group is given the class "sector" 
//                          and transformed according to the "pos" property of the corresponding attribute
let sectorG = svg.selectAll('.sector')
                    .data(stockData)
                    .enter()
                        .append('g')
                            .attr('class', 'sector')
                            .attr('transform', function(d) {
                                return 'translate('+d.pos+')';
                            });

// notice that sectorG is an object with the properties _parents and _groups
// the _parents property contains an array of the selection's parents (in this case, the svg we called selectAll on)
// the _groups property contains an array with the same length as the data we binded (in this case, stockData.length === 3)
//          each element in _groups is a group element with a transform of the corresponding stockData element's "pos" attribute
console.log(sectorG);


// now, when we call .append('circle') on sectorG, 
//      the append function will iterate through _groups and append a circle to each of the elements in _groups
//         attr('r', function(d) { return radiusScale(d.value.total); }) sets the radius of each circle to the corresponding sector's total price (d.value.total)
//         and attr('fill', '#ccc') will apply the color '#ccc' to each circle
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// sectorG.append('circle')
//             .attr('r', function(d) {
//                 return radiusScale(d.value.total);
//             }).style('fill', '#ccc');
/****************************************************************************************************************************/



// just like we created a selection within the svg using "svg.selectAll"
// we can create a new seletion within sectorG using "sectorG.selectAll"
// let's select all elements with the class "company"
// Notice that this selection "is empty"
//          More precisely, the _groups property of this selection contains an array of empty NodeList objects
//              Note that this array is still the same length of stockData (there are 3 elements)
// Also notice that the _parents property has changed
//              Since we called selectAll on sectorG, the _groups property of sectorG becomes the _parents property of our new selection
//              this selection's parents are therefore the three html group elements 
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// console.log(sectorG.selectAll('.company'));
/****************************************************************************************************************************/



// now, here we get to the concept of nesting in d3
//      with this new selection, we can chain the .data(), .enter(), and .append() functions again
//      by giving .data() a callback function instead of a new data object,
//          we tell d3 that we want the function to be applied to the selection's current binded data (in this case, stockData)
//              the callback function: function(d) { return d.value.companies } will be applied to each element of stockData
//                  which returns an array of length 3, with each element being an array with the same length of the corresponding "companies" array
//      now, when we call .enter() and .append('g'), d3 will append a group for each of the elements inside of the nested arrays (each company)
//          each group will be applied to the appropriate element within the _parents array
//
// If we check the console, we can see that the _groups property of companyG contains an array
//      each element of this array is a nested array containing the company groups for the corresponding sector
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// let companyG = sectorG.selectAll('.company')
//                         .data(function(d) {
//                             return d.value.companies;
//                         })
//                         .enter()
//                             .append('g')
//                                 .attr('class', 'company')
//                                 .attr('transform', function(d) {
//                                     return 'translate('+d.pos+')';
//                                 });

// console.log(companyG);
/****************************************************************************************************************************/



// now, when we call .append('circle') on companyG, 
//      the append function will iterate through each nested array in _groups and append a circle to the corresponding nested group
//         attr('r', function(d) { return radiusScale(d.price); }) sets the radius of each circle to the corresponding company's price (d.price)
//         and attr('fill', function(d) { return d.color; }) will apply the corresponding company object's specified color (d.color) to the circle
/*********************************************** UNCOMMENT THIS WHEN READY **************************************************/
// companyG.append('circle')
//             .attr('r', function(d) {
//                 return radiusScale(d.price);
//             })
//             .style('fill', function(d) {
//                 return d.color;
//             });
/****************************************************************************************************************************/