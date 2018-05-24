angular.module('myService', [])
  .service('myService', [function () {
    this.name = 'yanyue';
    this.myJsonp = function (url, data, callback) {

      var fnName = 'myJsonp_' + Math.random().toString().replace('.', '');

      window[fnName] = callback;

      var querystring = '';

      for (var attr in data) {

        querystring += attr + '=' + data[attr] + '&';

      }

      var script = document.createElement('script');

      script.src = url + '?' + querystring + 'callback=' + fnName;

      script.onload = function () {

        document.body.removeChild(script);

      }

      document.body.appendChild(script);

    }
  }])