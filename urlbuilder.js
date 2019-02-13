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

function buildUrl(controller, action, parameters) {
    var url = basePath + '/WebApiClient';
    var urlComponents = [url];
    if (!controller) {
        throw 'A controller name must be specified.';
    }
	
   if (!action) {
        throw 'An action name must be specified.';
    }

    if (parameters) {
        parameters.apiController = controller;
        parameters.apiAction = action;
    } else {
        parameters = {
            apiController: controller,
            apiAction: action
        };
    }

    return urlComponents.join('/') + buildQueryString(parameters);
}