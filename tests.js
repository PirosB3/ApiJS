describe("ApiJS", function() {
  it("should be able to contain an API key", function() {
		var Pearson = createAPI({ apiKey: 'myApiKey' });
		var apiKey = Pearson.getDefaultParams().apiKey;
    expect(apiKey).toBe('myApiKey');
  });
	it("should always carry properties", function() {
		var Pearson = createAPI({ apiKey: 'myApiKey' });
		var apiKey = Pearson.callEndpoint('/topten/{id}').getDefaultParams().apiKey;
		expect(apiKey).toBe('myApiKey');
	});
	it("should be able to parse routes", function() {
		var route = _parseRoute('/user/{{userId}}', { userId: 22 });
		expect(route).toBe('/user/22');

		var route = _parseRoute('/user/{{userId}}/book/{{bookName}}/', { userId: 22, bookName: 'Lorem' });
		expect(route).toBe('/user/22/book/Lorem/');
	});
	it("should be able to get a url with positional args", function() {
		var Pearson = createAPI({ apiKey: 'myApiKey' });

		var call = Pearson.callEndpoint('/topten/{{id}}');
		expect(call._buildURL.bind(call)).toThrow("Property id was not found.");

		call = call.havingPositional({ id: 23 });
		expect(call._buildURL()).toBe('/topten/23');
	});
});
