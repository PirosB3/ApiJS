var ROUTE_RE = /({{\w+}})/g;

var _parseRoute = function(route, args) {

	// Parse route regex, if no matches, return the route
	var matches = route.match(ROUTE_RE);
	if (!matches) matches = [];

	return matches.reduce(function(currentRoute, match) {

		// Get first match and fetch property from args. if no
		// matches, raise exception
		var property = match.slice(2, match.length -2);
		var propertyArg = args[property];
		if (!propertyArg){
			throw new Error("Property " + property + " was not found.");
		}

		// Return new route with property
		return currentRoute.replace(match, propertyArg);
	}, route);

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

APIProcess.prototype.havingPositional = function(args) {
	return new APIProcess(_extend(this._params, {
		positionalParams: args
	}));
}

APIProcess.prototype._buildURL = function() {
	if (!this._params['endpoint']) {
		throw new Error("Endpoint was never defined");
	}
	return _parseRoute(
		this._params['endpoint'],
		_extend(this._params['positionalParams'])
	);
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
