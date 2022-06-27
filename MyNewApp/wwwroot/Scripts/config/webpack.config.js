const path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        homepage: "./wwwroot/Scripts/src/homepage.js",
        linechart: "./wwwroot/Scripts/src/linechart.js",
        dashboard: "./wwwroot/Scripts/src/dashboard.js",
        insights: "./wwwroot/Scripts/src/insights.js",
        analysis: "./wwwroot/Scripts/src/analysis.js",
        machinebutton: "./wwwroot/Scripts/src/machinebutton.js",
        entireplant: "./wwwroot/Scripts/src/entireplant.js",
        piechart: "./wwwroot/Scripts/src/piechart.js",
        performance: "./wwwroot/Scripts/src/performance.js",
        emissions: "./wwwroot/Scripts/src/emissions.js",
        colorArray: "./wwwroot/Scripts/src/colorArray.js",
        chartdataset: "./wwwroot/Scripts/src/chartdataset.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader"
                },
                test: /\.js$/,
                exclude: /node_modules/ //excludes node_modules folder from being transpiled by babel. We do this because it's a waste of resources to do so.
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            }
        ]
    }
}