const webpack = require("webpack");
const path = require("path");
const env  = require("yargs").argv.env; // use --env with webpack 2

const paths = {
    context: path.join(__dirname, "./src/"),
    output: path.join(__dirname, "./dist/"),
	entry: {
    	app:"./index.js"
	}
};



const config = {
	context: paths.context,
	entry: paths.entry,
	output: {
        path: paths.output,
		filename: "[name].js"
	},
	module: {
		rules: [

            {
                test: /\.css$/,
	            loader: ['style-loader','css-loader']
            },
			{
				test: /\.(jsx|js)$/,
				loader: "babel-loader",
				exclude: /node_modules/
			}
		]

	},
	resolve: { // In resolve we tell Webpack where to look for modules. as of Webpack ^2.0 important to give node modules folder too
		extensions: [".js", ".jsx"],
		modules: [paths.context,"node_modules"],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			children: true,
			async: true
		}),
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 2500
		})
	]
};

if (env === 'prod'){
    config.devtool =  "hidden-source-map";
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
			drop_console: true,
			drop_debugger: true,
			screw_ie8: true
		},
		output: {
			comments: false
		},
		sourceMap: false,
		beautify: false,
		mangle: {
            screw_ie8: true,
			keep_fnames: true
		},
        comments: false
	}));
    config.plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }));
} else {
    config.devtool =  "#inline-source-map";
    config.devServer = {
    	contentBase: paths.context,
		publicPath: '/',
		historyApiFallback: {
    		index: '/'
		},
		inline: true,
		port: 8080,
		stats: {
    		chunks: false,
			children: false
		},
		clientLogLevel: 'info'
	}
}

module.exports = config;
