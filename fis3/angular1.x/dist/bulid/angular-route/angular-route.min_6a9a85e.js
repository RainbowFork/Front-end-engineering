!function(e,r){"use strict";function t(e){s&&e.get("$route")}function n(e,t,n){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,i,o,c,u){function s(){d&&(n.cancel(d),d=null),f&&(f.$destroy(),f=null),h&&(d=n.leave(h),d.done(function(e){!1!==e&&(d=null)}),h=null)}function l(){var o=e.current&&e.current.locals;if(r.isDefined(o&&o.$template)){var o=a.$new(),c=e.current;h=u(o,function(e){n.enter(e,null,h||i).done(function(e){!1===e||!r.isDefined($)||$&&!a.$eval($)||t()}),s()}),f=c.scope=o,f.$emit("$viewContentLoaded"),f.$eval(p)}else s()}var f,h,d,$=o.autoscroll,p=o.onload||"";a.$on("$routeChangeSuccess",l),l()}}}function a(e,r,t){return{restrict:"ECA",priority:-400,link:function(n,a){var i=t.current,o=i.locals;a.html(o.$template);var c=e(a.contents());if(i.controller){o.$scope=n;var u=r(i.controller,o);i.controllerAs&&(n[i.controllerAs]=u),a.data("$ngControllerController",u),a.children().data("$ngControllerController",u)}n[i.resolveAs||"$resolve"]=o,c(n)}}}var i,o,c,u,s,l=r.module("ngRoute",[]).info({angularVersion:"1.6.4"}).provider("$route",function(){function e(e,t){return r.extend(Object.create(e),t)}function t(e,r){var t=r.caseInsensitiveMatch,n={originalPath:e,regexp:e},a=n.keys=[];return e=e.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)(\*\?|[?*])?/g,function(e,r,t,n){return e="?"===n||"*?"===n?"?":null,n="*"===n||"*?"===n?"*":null,a.push({name:t,optional:!!e}),r=r||"",""+(e?"":r)+"(?:"+(e?r:"")+(n&&"(.+?)"||"([^/]+)")+(e||"")+")"+(e||"")}).replace(/([\/$*])/g,"\\$1"),n.regexp=new RegExp("^"+e+"$",t?"i":""),n}i=r.isArray,o=r.isObject,c=r.isDefined,u=r.noop;var n={};this.when=function(e,a){var c;if(c=void 0,i(a)){c=c||[];for(var u=0,s=a.length;s>u;u++)c[u]=a[u]}else if(o(a))for(u in c=c||{},a)("$"!==u.charAt(0)||"$"!==u.charAt(1))&&(c[u]=a[u]);return c=c||a,r.isUndefined(c.reloadOnSearch)&&(c.reloadOnSearch=!0),r.isUndefined(c.caseInsensitiveMatch)&&(c.caseInsensitiveMatch=this.caseInsensitiveMatch),n[e]=r.extend(c,e&&t(e,c)),e&&(u="/"===e[e.length-1]?e.substr(0,e.length-1):e+"/",n[u]=r.extend({redirectTo:e},t(u,c))),this},this.caseInsensitiveMatch=!1,this.otherwise=function(e){return"string"==typeof e&&(e={redirectTo:e}),this.when(null,e),this},s=!0,this.eagerInstantiationEnabled=function(e){return c(e)?(s=e,this):s},this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce","$browser",function(t,a,i,o,c,s,l,h){function d(e){var n=S.current;(R=(P=w())&&n&&P.$$route===n.$$route&&r.equals(P.pathParams,n.pathParams)&&!P.reloadOnSearch&&!x)||!n&&!P||t.$broadcast("$routeChangeStart",P,n).defaultPrevented&&e&&e.preventDefault()}function $(){var e=S.current,n=P;if(R)e.params=n.params,r.copy(e.params,i),t.$broadcast("$routeUpdate",e);else if(n||e){x=!1,S.current=n;var a=o.resolve(n);h.$$incOutstandingRequestCount(),a.then(p).then(v).then(function(o){return o&&a.then(g).then(function(a){n===S.current&&(n&&(n.locals=a,r.copy(n.params,i)),t.$broadcast("$routeChangeSuccess",n,e))})}).catch(function(r){n===S.current&&t.$broadcast("$routeChangeError",n,e,r)}).finally(function(){h.$$completeOutstandingRequest(u)})}}function p(e){var t={route:e,hasRedirection:!1};if(e)if(e.redirectTo)if(r.isString(e.redirectTo))t.path=C(e.redirectTo,e.params),t.search=e.params,t.hasRedirection=!0;else{var n=a.path(),i=a.search();e=e.redirectTo(e.pathParams,n,i),r.isDefined(e)&&(t.url=e,t.hasRedirection=!0)}else if(e.resolveRedirectTo)return o.resolve(c.invoke(e.resolveRedirectTo)).then(function(e){return r.isDefined(e)&&(t.url=e,t.hasRedirection=!0),t});return t}function v(e){var r=!0;if(e.route!==S.current)r=!1;else if(e.hasRedirection){var t=a.url(),n=e.url;n?a.url(n).replace():n=a.path(e.path).search(e.search).replace().url(),n!==t&&(r=!1)}return r}function g(e){if(e){var t=r.extend({},e.resolve);return r.forEach(t,function(e,n){t[n]=r.isString(e)?c.get(e):c.invoke(e,null,null,n)}),e=m(e),r.isDefined(e)&&(t.$template=e),o.all(t)}}function m(e){var t,n;return r.isDefined(t=e.template)?r.isFunction(t)&&(t=t(e.params)):r.isDefined(n=e.templateUrl)&&(r.isFunction(n)&&(n=n(e.params)),r.isDefined(n)&&(e.loadedTemplateUrl=l.valueOf(n),t=s(n))),t}function w(){var t,i;return r.forEach(n,function(n){var o;if(o=!i){var c=a.path();o=n.keys;var u={};if(n.regexp)if(c=n.regexp.exec(c)){for(var s=1,l=c.length;l>s;++s){var f=o[s-1],h=c[s];f&&h&&(u[f.name]=h)}o=u}else o=null;else o=null;o=t=o}o&&(i=e(n,{params:r.extend({},a.search(),t),pathParams:t}),i.$$route=n)}),i||n[null]&&e(n[null],{params:{},pathParams:{}})}function C(e,t){var n=[];return r.forEach((e||"").split(":"),function(e,r){if(0===r)n.push(e);else{var a=e.match(/(\w+)(?:[?*])?(.*)/),i=a[1];n.push(t[i]),n.push(a[2]||""),delete t[i]}}),n.join("")}var P,R,x=!1,S={routes:n,reload:function(){x=!0;var e={defaultPrevented:!1,preventDefault:function(){this.defaultPrevented=!0,x=!1}};t.$evalAsync(function(){d(e),e.defaultPrevented||$()})},updateParams:function(e){if(!this.current||!this.current.$$route)throw f("norout");e=r.extend({},this.current.params,e),a.path(C(this.current.$$route.originalPath,e)),a.search(e)}};return t.$on("$locationChangeStart",d),t.$on("$locationChangeSuccess",$),S}]}).run(t),f=r.$$minErr("ngRoute");t.$inject=["$injector"],l.provider("$routeParams",function(){this.$get=function(){return{}}}),l.directive("ngView",n),l.directive("ngView",a),n.$inject=["$route","$anchorScroll","$animate"],a.$inject=["$compile","$controller","$route"]}(window,window.angular);