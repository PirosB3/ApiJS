var ROUTE_RE = /({{\w+}})/g;

var _parseRoute = function(rootUrl, route, positionalArgs, getParams) {

	// Parse route regex, if no matches, return the route
	var matches = route.match(ROUTE_RE);
	if (!matches) matches = [];

	route = matches.reduce(function(currentRoute, match) {

		// Get first match and fetch property from positional args. if no
		// matches, raise exception
		var property = match.slice(2, match.length -2);
		var propertyArg = positionalArgs[property];
		if (!propertyArg){
			throw new Error("Property " + property + " was not found.");
		}

		// Return new route with property
		return currentRoute.replace(match, propertyArg);
	}, rootUrl + route);

	// If there are any GET parameters, add them now and append to existing route.
	var getParamsString = $.param(getParams || {});
	if (getParamsString) {
		route = route + '?' + getParamsString;
	}

	return route;

}

var _extend = function(oldParams, newParams) {
	return $.extend({}, oldParams, newParams);
}

var APIProcess = function(params) {
	this._params = params;
}

APIProcess.prototype.getDefaultParams = function() {
	return this._params['defaultArgs'];
}

APIProcess.prototype.withArgs = function(args) {
	return new APIProcess(_extend(this._params, {
		args: args
	}));
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
		this._params['rootUrl'],
		this._params['endpoint'],
		_extend(this._params['positionalParams']),
		_extend(this._params['defaultArgs'], this._params['args'])
	);
}

APIProcess.prototype.callEndpoint = function(endpoint) {
	return new APIProcess(_extend(this._params, {
		endpoint: endpoint
	}));
}

APIProcess.prototype.fetch = function() {
	return $.ajax({
		url: this._buildURL()
	});
}

var createAPI = function(params, rootUrl) {
	return new APIProcess({
		defaultArgs: params,
		rootUrl: rootUrl || ''
	});
};


window.createAPI = createAPI;
