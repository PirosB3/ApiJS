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
});
