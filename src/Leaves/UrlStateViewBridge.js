/**
 * Polyfill for URLSearchParams support courtesy from https://github.com/WebReflection/url-search-params
 */
var URLSearchParams=URLSearchParams||function(){"use strict";function e(e){return encodeURIComponent(e).replace(i,u)}function t(e){return decodeURIComponent(e.replace(s," "))}function n(e){this[f]=Object.create(null);if(!e)return;e.charAt(0)==="?"&&(e=e.slice(1));for(var n,r,i=(e||"").split("&"),s=0,o=i.length;s<o;s++)r=i[s],n=r.indexOf("="),-1<n?this.append(t(r.slice(0,n)),t(r.slice(n+1))):r.length&&this.append(t(r),"")}function l(){try{return!!Symbol.iterator}catch(e){return!1}}var r=n.prototype,i=/[!'\(\)~]|%20|%00/g,s=/\+/g,o={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"},u=function(e){return o[e]},a=l(),f="__URLSearchParams__:"+Math.random();r.append=function(t,n){var r=this[f];t in r?r[t].push(""+n):r[t]=[""+n]},r.delete=function(t){delete this[f][t]},r.get=function(t){var n=this[f];return t in n?n[t][0]:null},r.getAll=function(t){var n=this[f];return t in n?n[t].slice(0):[]},r.has=function(t){return t in this[f]},r.set=function(t,n){this[f][t]=[""+n]},r.forEach=function(t,n){var r=this[f];Object.getOwnPropertyNames(r).forEach(function(e){r[e].forEach(function(r){t.call(n,r,e,this)},this)},this)},r.keys=function(){var t=[];this.forEach(function(e,n){t.push(n)});var n={next:function(){var e=t.shift();return{done:e===undefined,value:e}}};return a&&(n[Symbol.iterator]=function(){return n}),n},r.values=function(){var t=[];this.forEach(function(e){t.push(e)});var n={next:function(){var e=t.shift();return{done:e===undefined,value:e}}};return a&&(n[Symbol.iterator]=function(){return n}),n},r.entries=function(){var t=[];this.forEach(function(e,n){t.push([n,e])});var n={next:function(){var e=t.shift();return{done:e===undefined,value:e}}};return a&&(n[Symbol.iterator]=function(){return n}),n},a&&(r[Symbol.iterator]=r.entries),r.toJSON=function(){return{}},r.toString=function y(){var t=this[f],n=[],r,i,s,o;for(i in t){s=e(i);for(r=0,o=t[i];r<o.length;r++)n.push(s+"="+e(o[r]))}return n.join("&")};var c=Object.defineProperty,h=Object.getOwnPropertyDescriptor,p=function(e){function t(t,n){r.append.call(this,t,n),t=this.toString(),e.set.call(this._usp,t?"?"+t:"")}function n(t){r.delete.call(this,t),t=this.toString(),e.set.call(this._usp,t?"?"+t:"")}function i(t,n){r.set.call(this,t,n),t=this.toString(),e.set.call(this._usp,t?"?"+t:"")}return function(e,r){return e.append=t,e.delete=n,e.set=i,c(e,"_usp",{configurable:!0,writable:!0,value:r})}},d=function(e){return function(t,n){return c(t,"_searchParams",{configurable:!0,writable:!0,value:e(n,t)}),n}},v=function(e){var t=e.append;e.append=r.append,n.call(e,e._usp.search.slice(1)),e.append=t},m=function(e,t){if(!(e instanceof t))throw new TypeError("'searchParams' accessed on an object that does not implement interface "+t.name)},g=function(e){var t=e.prototype,r=h(t,"searchParams"),i=h(t,"href"),s=h(t,"search"),o;!r&&s&&s.set&&(o=d(p(s)),Object.defineProperties(t,{href:{get:function(){return i.get.call(this)},set:function(e){var t=this._searchParams;i.set.call(this,e),t&&v(t)}},search:{get:function(){return s.get.call(this)},set:function(e){var t=this._searchParams;s.set.call(this,e),t&&v(t)}},searchParams:{get:function(){return m(this,e),this._searchParams||o(this,new n(this.search.slice(1)))},set:function(t){m(this,e),o(this,t)}}}))};return g(HTMLAnchorElement),/^function|object$/.test(typeof URL)&&URL.prototype&&g(URL),n}();

var urlStateBridge = function (leafPath) {
    window.rhubarb.viewBridgeClasses.ViewBridge.apply(this, arguments);
};

urlStateBridge.prototype = new window.rhubarb.viewBridgeClasses.ViewBridge();
urlStateBridge.prototype.constructor = urlStateBridge;

urlStateBridge.prototype.getUrlParam = function (paramName) {
    var existingParams = new URLSearchParams(location.search);
    return existingParams.get(paramName);
};
urlStateBridge.prototype.getUrlStateParam = function () {
    return this.getUrlParam(this.model.urlStateName);
};

urlStateBridge.prototype.updateUrlState = function (newParams) {
    var params = new URLSearchParams(location.search);

    for (var param in newParams) {
        if (newParams.hasOwnProperty(param)) {
            if (newParams[param]) {
                params.set(param, newParams[param]);
            } else {
                params.delete(param);
            }
        }
    }

    params = '' + params;
    window.history.replaceState(null, '', params ? '?' + params : location.pathname);
};

urlStateBridge.prototype.setUrlStateParam = function (value) {
    var state = {};
    state[this.model.urlStateName] = value;

    this.updateUrlState(state);
};

window.rhubarb.viewBridgeClasses.UrlStateViewBridge = urlStateBridge;
