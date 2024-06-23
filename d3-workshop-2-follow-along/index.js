var stockData = [
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

let svg = d3.select(`#main`)
            .append('svg')
                .attr('width', 600)
                .attr('height', 400)

let radiusScale = d3.scaleLinear().domain([0, d3.min(stockData, d => d.value.total)]).range([0,20])

let sectorG = svg.selectAll('.sector')
    .data(stockData)
    .enter()
    .append('g')
    .attr('class', 'sector')
    .attr('transform', function(d) {
        return 'translate('+d.pos+')';
    });

sectorG.append('circle')
    .attr('r', function(d) {
        return radiusScale(d.value.total);
    }).style('fill', '#ccc');

let companyG = sectorG.selectAll('.company')
    .data(function(d) {
        return d.value.companies;
    })
    .enter()
    .append('g')
    .attr('class', 'company')
    .attr('transform', function(d) {
        return 'translate('+d.pos+')';
    });

companyG.append('circle')
    .attr('r', function(d) {
        return radiusScale(d.price);
    })
    .style('fill', function(d) {
        return d.color;
    });