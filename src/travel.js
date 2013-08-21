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
