var ROUTE_RE = /({{\w+}})/g;

var _parseRoute = function(route, args) {

	// Parse route regex, if no matches, return the route
	var matches = route.match(ROUTE_RE);
	if (!matches) return route;

	// Get first match and fetch property from args. if no
	// matches, raise exception
	var result = route;
	matches.forEach(function(match) {
		var property = match.slice(2, match.length -2);
		var propertyArg = args[property];
		if (!propertyArg){
			throw new Error("Property " + property + " was not found.");
		}

		// Return new route with property
		result = result.replace(match, propertyArg);
	});

	return result;
}

var _extend = function(oldParams, newParams) {
	return $.extend({}, oldParams, newParams);
}

var APIProcess = function(params) {
	this._params = params;
}

APIProcess.prototype.getDefaultParams = function() {
	return this._params['defaultParams'];
}

APIProcess.prototype.callEndpoint = function(endpoint) {
	return new APIProcess(_extend(this._params, {
		endpoint: endpoint
	}));
}

var createAPI = function(params) {
	return new APIProcess({
		defaultParams: params
	});
};


window.createAPI = createAPI;
