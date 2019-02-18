function buildUrl(parameters, clientController, clientAction, apiController, apiAction, location) {
	var urlComponents = [];
	
    if(location){
    	urlComponents.push(location);
    }
	else
    {
    	var location = [window.location.protocol, '//', window.location.hostname];        
    	urlComponents.push(location.join(''));
    }
    
    if(clientController) urlComponents.push(clientController);
    if(clientController && clientAction) urlComponents.push(clientAction);
    
   var params = {};
   if(apiController) params.apiController = apiController;
   if(apiController && apiAction) params.apiAction = apiAction;
   for(var p in parameters) params[p] = parameters[p];
   
   return urlComponents.join('/') + buildQueryString(params);
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