var baseURL = 'http://www.robatsky-dev.de/api/containers';

var handleDeleteButton = function (dockerID) {
    deleteRequest(dockerID);
    postRequest(dockerID);
}

var handleDuplicateButton = function (dockerID) {
    getRequest(dockerID);
}

var deleteRequest = function (dockerID) {
    var url = baseURL + '/' + dockerID;
    sendRequest(url, 'DELETE', null, null, function (http) {
        console.log(http.responseText);
    });
}

var getRequest = function (dockerID) {
    var url = baseURL + '/' + dockerID;
    sendRequest(url, 'GET', null, null, function (http) {
        console.log(http.responseText);
    });
}

var postRequest = function (dockerID) {
    var url = baseURL;
    var data = {};
    data.dockerID = dockerID;
    data.name = "Foo";

    sendRequest(url, 'POST', JSON.stringify(data), 'application/json; charset=utf-8', function (http) {
        console.log(http.responseText);
    });
}



var sendRequest = function (url, operation, params, contentType, callback) {
    var http = new XMLHttpRequest();
    http.open(operation, url);

    if (contentType != null) {
        http.setRequestHeader('Content-type', contentType);
    }

    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            if (http.status == 200) {
                callback(http);
            } else {
                alert("Something went wrong: " + http.responseText);
            }
        }
    }

    http.send(params);
}

var updateTable = function (containers) {
    //TODO update table
}