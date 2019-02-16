function buildUrl(apiController, apiAction, apiParameters) {
	
    if (!apiController) throw 'A controller name must be specified.';
	if (!apiAction)  throw 'An action name must be specified.';
	
	var urlComponents = [location.protocol.concat('//'), window.location.hostname];
	var parameters = { apiController: apiController, apiAction: apiAction};
	for(var p in apiParameters) parameters[p] = apiParameters[p];
	
	return urlComponents.join('/') + buildQueryString(parameters);
}

function buildQueryString(object) {
    var queryString = '';
    for (var property in object) {
        if (object[property] || (typeof (object[property]) === 'boolean')) {
            if (object[property].constructor === Array) {
                var joinedString = property + '=' + object[property].join('&' + property + '=');
                queryString += queryString.length > 0 ? '&' + joinedString : '?' + joinedString;
            }
            else {
                queryString += queryString.length > 0 ? '&' + property + '=' + object[property] : '?' + property + '=' + object[property];
            }
        }
    }
    return queryString;
}