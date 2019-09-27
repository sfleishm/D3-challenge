// @TODO: YOUR CODE HERE!
// Looking at 16.3 Act 11 Hair Metal for a lot of stuff
// Create chart as well as margins
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 50,
    right: 40, 
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG Wrapper

var svg = d3
    .select("#scatter")
    // .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group in the SVG
var chartGroup = svg.append("g")
    .attr("transfom", `translate(${margin.left}, ${margin.top})`);

// X Params
var chosenXAxis = "poverty";

// Function for updating x-Scale on click - used for bonus
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}
// Function for updating x-Axis

// Function for updating circles Group

// Function for updating circles with new tooltip

// Get data from CSV:
d3.csv("../assets/data/data.csv").then(function(data,err) {
    if (err) throw err;

    console.log(data);

    // grab poverty and healthcare data
    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.abbr = data.abbr;
    });

    // xScale from
    var xLinearScale = xScale(data, chosenXAxis);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([height, 0]);

    // Create axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append X axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Append Y axis
    // var yAxis = chartGroup.append("g")
    //     .classed("y-axs", true)
    //     .attr("transform", `(0, translate(${height})`)
    //     .call(leftAxis);
    // chartGroup.append("g")
    //     .call(leftAxis);

    // Append Circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 10)
        .attr("fill", "blue")
        .attr("opacity", ".5");
    
    // Append Text - For some reason starting at FL 
    var textGroup = chartGroup.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("font-size", "10px")
        .attr("fill", "black")
        .text(d => d.abbr);

    // seeing if putting the left axis down here will work 
    chartGroup.append("g")
        .call(leftAxis);
})