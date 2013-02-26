// ---------------------
// element prototypes
// ---------------------

if (!Element.prototype.addClass) {
    Element.prototype.addClass = function (c) {
        c = c.split(' ');
		for(var i=0; i<c.length; i++)
        if(!this.hasClass(c[i]))
        this.className = this.className!==''?(this.className+' '+c[i]):c[i];
		return this;
    };
}
if (!Element.prototype.hasClass) {
    Element.prototype.hasClass = function (c) {
        var r = true, e = this.className.split(' '); c = c.split(' ');
		for(var i=0; i<c.length; i++)
        if(e.indexOf(c[i])===-1)
        r = false;
		return r;
    };
}
if (!Element.prototype.removeClass) {
    Element.prototype.removeClass = function (c) {
        var e = this.className.split(' '); c = c.split(' ');
		for(var i=0; i<c.length; i++)
        if(this.hasClass(c[i]))
        e.splice(e.indexOf(c[i]), 1);
		this.className = e.join(' ');
		return this;
    };
}
if (!Element.prototype.toggleClass) {
    Element.prototype.toggleClass = function (c) {
        c = c.split(' ');
		for(var i=0; i<c.length; i++)
        if (this.hasClass(c[i]))
        this.removeClass(c[i]);
        else
        this.addClass(c[i]);
		return this;
    };
}

// ---------------------
// array prototypes
// ---------------------

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}
// ---------------------
// object prototypes
// ---------------------

if (!Object.prototype.merge) {
    Object.prototype.merge = function (obj) {
  	o1 = this;
		for (var key in obj) {
			o1[key] = obj[key];
		}
		return o1;
    };
}
// ---------------------
// string prototypes
// ---------------------

//capital first letter of first word
if (!String.prototype.capitalize) {
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
	};
}
//capital first letter of all words
if (!String.prototype.capitalizeAll) {
	String.prototype.capitalizeAll = function() {
		return this.replace(/\w+/g, function(word) {
            return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        });
	};
}
// case inverse
if (!String.prototype.inverse) {
	String.prototype.inverse = function() {
		return this.replace(/([a-z]+)|([A-Z]+)/g, function(match, lower, upper) {
            return lower ? match.toUpperCase() : match.toLowerCase();
        });
	};
}
// removes chars between 'start' and 'end'
if (!String.prototype.clear) {
	String.prototype.clear = function(start, end) {
		return this.slice(0, start) + this.slice(end);
	};
}
//convert to camelCase
if (!String.prototype.camelCase) {
	String.prototype.camelCase = function() {
		return this.replace(/\W+(.)/g, function(match, letter) {
            return letter.toUpperCase();
        });
	};
}
//collapses a strings whitespaces
if (!String.prototype.collapse) {
	String.prototype.collapse = function() {
		var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
        return new S(s);
	};
}
//reverses the string
if (!String.prototype.reverse) {
	String.prototype.reverse = function () 
	{
		return this.split('').reverse().join('');
	};
}
//check string if contains a string
if (!String.prototype.contains) {
	String.prototype.contains = function(value) {
	 return this.indexOf(value) > -1;
	};
}
//trim space from start of string
if (!String.prototype.ltrim) {
	String.prototype.ltrim = function () {
		return this.replace(/^\s+/, '');
	};
}
//trim space from end of string
if (!String.prototype.rtrim) {
	String.prototype.rtrim = function () {
		return this.replace(/\s+$/, '');
	};
}
//trim spaces from start and end of string
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.ltrim().rtrim();
	};
}
// -------------------------------------------------------
// -- Avoid `console` errors in browsers that lack a console.
// -------------------------------------------------------
(function() {
    var method;
    var noop = function () {};
    var methods = [
        "assert", "clear", "count", "debug", "dir", "dirxml", "error",
        "exception", "group", "groupCollapsed", "groupEnd", "info", "log",
        "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd",
        "timeStamp", "trace", "warn"
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
// -------------------------------------------------------
// -- Reusable functions
// -------------------------------------------------------
// php.js functions
function strpos(haystack, needle, offset) {
  var i = (haystack+'').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}

function is_string(input){
	return typeof(input)==='string';
}

function now(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;//January is 0!
	var yyyy = today.getFullYear();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	if(dd<10){dd='0'+dd;}
	if(mm<10){mm='0'+mm;}
	return yyyy+'-'+mm+'-'+dd+' '+hours+':'+minutes+':'+seconds;
}

function stripos (f_haystack, f_needle, f_offset) {
  var haystack = (f_haystack + '').toLowerCase();
  var needle = (f_needle + '').toLowerCase();
  var index = 0;
  if ((index = haystack.indexOf(needle, f_offset)) !== -1) {
    return index;
  }
  return false;
}

function urldecode(url) {
  return decodeURIComponent(url.replace(/\+/g, ' '));
}

function htmlspecialchars_decode(string, quote_style) {
  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { 
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp || OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style && OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}

function addslashes (str) {
   return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function validEmail(email)
{
var atpos=email.indexOf("@");
var dotpos=email.lastIndexOf(".");
if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
  {
  return false;
  } else {
	return true;
  }
}
function msg(type,str)
{
	var thisid = Math.floor(Math.random()*101);
	$('div#messages').prepend('<div id="' + thisid + '" class="' + type + '">' + str + '</div>');
	$('div#' + thisid).fadeIn('slow');
	$(window).scrollTop(-$(window).scrollTop());
		setTimeout(function(){
			$('div#' + thisid).fadeOut("slow", function () {
				$('div#' + thisid).remove();
			});
		}, 5000);
}
function apiSignature(verb,table) {
	var api_key = "TYFPWB77TG19K1G0WS1K0G1983G10Q96"; //$("input#api_key").val();
	var api_username = "master"; //$("input#api_username").val();
	var signature = '{"username":"' + api_username + '","verb":"' + verb + '","table":"' + table + '"}'; //$("input#api_signature").val(); signature = username + http verb + table
	return Base64.encode(api_key + "-" + signature);
}
// -------------------------------------------------------
// -- Browser detection
// -- BrowserDetect.browser == 'Explorer';
// -- BrowserDetect.version <= 9;
// -------------------------------------------------------
var BrowserDetect = 
{
    init: function () 
    {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data) 
    {
        for (var i=0 ; i < data.length ; i++)   
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) 
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1)); 
		}
    },

    dataBrowser: 
    [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};
BrowserDetect.init();
// -------------------------------------------------------
// -- Plugin JavaScript methods: Base64.encode, Base64.decode, Base64._utf8_encode, and Base64._utf8_decode
// -------------------------------------------------------
var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		
		input = Base64._utf8_encode(input);
		
		while (i < input.length) {
			
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			
			output = output +
			Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
			Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
			
		}
		
		return output;
	},
	
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		
		while (i < input.length) {
			
			enc1 = Base64._keyStr.indexOf(input.charAt(i++));
			enc2 = Base64._keyStr.indexOf(input.charAt(i++));
			enc3 = Base64._keyStr.indexOf(input.charAt(i++));
			enc4 = Base64._keyStr.indexOf(input.charAt(i++));
			
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			
			output = output + String.fromCharCode(chr1);
			
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
			
		}
		
		output = Base64._utf8_decode(output);
		
		return output;
		
	},
	
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		
		for (var n = 0; n < string.length; n++) {
			
			var c = string.charCodeAt(n);
			
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			
		}
		
		return utftext;
	},
	
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		
		while ( i < utftext.length ) {
			
			c = utftext.charCodeAt(i);
			
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
			
		}
		return string;
	}
};
// -------------------------------------------------------
// -- SHA256 logical functions
// -------------------------------------------------------
function rotateRight(n,x) {
	return ((x >>> n) | (x << (32 - n)));
}
function choice(x,y,z) {
	return ((x & y) ^ (~x & z));
}
function majority(x,y,z) {
	return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0(x) {
	return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
}
function sha256_Sigma1(x) {
	return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
}
function sha256_sigma0(x) {
	return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
}
function sha256_sigma1(x) {
	return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
}
function sha256_expand(W, j) {
	return (W[j&0x0f] += sha256_sigma1(W[(j+14)&0x0f]) + W[(j+9)&0x0f] + 
sha256_sigma0(W[(j+1)&0x0f]));
}

// Hash constant words K:
var K256 = new Array(
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
);

// global arrays
var ihash, count, buffer;
var sha256_hex_digits = "0123456789abcdef";

// Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: overflow)
function safe_add(x, y)
{
	var lsw = (x & 0xffff) + (y & 0xffff);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
}

// Initialise the SHA256 computation 
function sha256_init() {
	ihash = new Array(8);
	count = new Array(2);
	buffer = new Array(64);
	count[0] = count[1] = 0;
	ihash[0] = 0x6a09e667;
	ihash[1] = 0xbb67ae85;
	ihash[2] = 0x3c6ef372;
	ihash[3] = 0xa54ff53a;
	ihash[4] = 0x510e527f;
	ihash[5] = 0x9b05688c;
	ihash[6] = 0x1f83d9ab;
	ihash[7] = 0x5be0cd19;
}

// Transform a 512-bit message block 
function sha256_transform() {
	var a, b, c, d, e, f, g, h, T1, T2;
	var W = new Array(16);

	// Initialize registers with the previous intermediate value 
	a = ihash[0];
	b = ihash[1];
	c = ihash[2];
	d = ihash[3];
	e = ihash[4];
	f = ihash[5];
	g = ihash[6];
	h = ihash[7];

        // make 32-bit words 
	for(var i=0; i<16; i++)
		W[i] = ((buffer[(i<<2)+3]) | (buffer[(i<<2)+2] << 8) | (buffer[(i<<2)+1] 
<< 16) | (buffer[i<<2] << 24));

        for(var j=0; j<64; j++) {
		T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
		if(j < 16) T1 += W[j];
		else T1 += sha256_expand(W, j);
		T2 = sha256_Sigma0(a) + majority(a, b, c);
		h = g;
		g = f;
		f = e;
		e = safe_add(d, T1);
		d = c;
		c = b;
		b = a;
		a = safe_add(T1, T2);
        }

	// Compute the current intermediate hash value 
	ihash[0] += a;
	ihash[1] += b;
	ihash[2] += c;
	ihash[3] += d;
	ihash[4] += e;
	ihash[5] += f;
	ihash[6] += g;
	ihash[7] += h;
}

// Read the next chunk of data and update the SHA256 computation 
function sha256_update(data, inputLen) {
	var i, index, curpos = 0;
	// Compute number of bytes mod 64 
	index = ((count[0] >> 3) & 0x3f);
        var remainder = (inputLen & 0x3f);

	// Update number of bits 
	if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
	count[1] += (inputLen >> 29);

	// Transform as many times as possible 
	for(i=0; i+63<inputLen; i+=64) {
                for(var j=index; j<64; j++)
			buffer[j] = data.charCodeAt(curpos++);
		sha256_transform();
		index = 0;
	}

	// Buffer remaining input 
	for(var j=0; j<remainder; j++)
		buffer[j] = data.charCodeAt(curpos++);
}

// Finish the computation by operations such as padding 
function sha256_final() {
	var index = ((count[0] >> 3) & 0x3f);
        buffer[index++] = 0x80;
        if(index <= 56) {
		for(var i=index; i<56; i++)
			buffer[i] = 0;
        } else {
		for(var i=index; i<64; i++)
			buffer[i] = 0;
                sha256_transform();
                for(var i=0; i<56; i++)
			buffer[i] = 0;
	}
        buffer[56] = (count[1] >>> 24) & 0xff;
        buffer[57] = (count[1] >>> 16) & 0xff;
        buffer[58] = (count[1] >>> 8) & 0xff;
        buffer[59] = count[1] & 0xff;
        buffer[60] = (count[0] >>> 24) & 0xff;
        buffer[61] = (count[0] >>> 16) & 0xff;
        buffer[62] = (count[0] >>> 8) & 0xff;
        buffer[63] = count[0] & 0xff;
        sha256_transform();
}

// Split the internal hash values into an array of bytes 
function sha256_encode_bytes() {
        var j=0;
        var output = new Array(32);
	for(var i=0; i<8; i++) {
		output[j++] = ((ihash[i] >>> 24) & 0xff);
		output[j++] = ((ihash[i] >>> 16) & 0xff);
		output[j++] = ((ihash[i] >>> 8) & 0xff);
		output[j++] = (ihash[i] & 0xff);
	}
	return output;
}

// Get the internal hash as a hex string 
function sha256_encode_hex() {
	var output = new String();
	for(var i=0; i<8; i++) {
		for(var j=28; j>=0; j-=4)
			output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
	}
	return output;
}

// Main function: returns a hex string representing the SHA256 value of the given data 
function sha256_digest(data) {
	sha256_init();
	sha256_update(data, data.length);
	sha256_final();
        return sha256_encode_hex();
}

// test if the JS-interpreter is working properly 
function sha256_self_test()
{
	return sha256_digest("message digest") == 
"f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
}