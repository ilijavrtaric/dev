function get(url, data) {
    this.serialiseObject = function (obj) {
        var pairs = [];
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }
            pairs.push(prop + '=' + encodeURIComponent(obj[prop]));
        }
        return pairs.join('&');
    };
    if (typeof data !== 'undefined' && typeof data === 'object') {
        data = this.serialiseObject(data);
    }
    var active = true;
    var response = {};
    if (url) {
        // return a new page object if we're in the window scope
        if (window === this) {
            return new get(url, data);
        }
        var httpRequest;
        url = 'http://echo.jsontest.com/' + url;
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            httpRequest = new XMLHttpRequest();
        } else {
            if (window.ActiveXObject) { // IE
                try {
                    httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {}
                }
            }
        }
        if (!httpRequest) {
            //Cannot create an XMLHTTP instance
            return false;
        }
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    active = false;
                    response = httpRequest.responseText;
                } else {
                    active = false;
                    response = httpRequest.status;
                }
            }
        };
        if (data !== 'undefined' && typeof data === 'string') {
            httpRequest.open('GET', url + '?' + data, true);
        } else {
            httpRequest.open('GET', url, true);
        }
        httpRequest.send(null);
    } else {
        return false;
    }
    this.done = function (c) {
        var check = setInterval(function () {
            if (active !== true) {
                if (typeof c !== 'undefined') {
                    clearInterval(check);
                    return c(JSON.parse(response));
                } else {
                    clearInterval(check);
                    return JSON.parse(response);
                }
            }
        }, 500);
    };
}