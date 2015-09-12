'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (W, D) {

  var $ = document.querySelector.bind(document);
  var className = 'page-walker';
  var selector = '.' + className;

  var definition = function definition() {
    var PageWalker = (function () {
      function PageWalker() {
        _classCallCheck(this, PageWalker);

        this.bgColor = '#0A74DA';
        this.position = 'top';
      }

      _createClass(PageWalker, [{
        key: 'style',
        value: function style() {
          return '\n          position: fixed;\n          ' + this.position + ': 0;\n          background-color: ' + this.bgColor + ';\n          left: 0;\n          width: 0;\n          height: 3px;\n          z-index: 9999;\n          transition: width .3s ease-in-out;\n        ';
        }
      }, {
        key: 'watch',
        value: function watch() {
          var exitsingBar = $(selector);
          if (exitsingBar) {
            D.body.removeChild(exitsingBar);
          }
          this.getBar();
          this.watchBar();
        }
      }, {
        key: 'watchBar',
        value: function watchBar() {
          W.addEventListener('scroll', function () {
            updateProgress();
          });
        }
      }, {
        key: 'getBar',
        value: function getBar() {
          var bar = $(selector);
          if (!bar) {
            bar = this.initBar();
          }
          return bar;
        }
      }, {
        key: 'initBar',
        value: function initBar() {
          var bar = D.createElement('div');
          bar.className = className;
          bar.setAttribute('style', this.style());
          D.body.appendChild(bar);
          return bar;
        }
      }, {
        key: 'top',
        value: function top() {
          this.position = 'top';
          return this;
        }
      }, {
        key: 'bottom',
        value: function bottom() {
          this.position = 'bottom';
          return this;
        }
      }]);

      return PageWalker;
    })();

    return new PageWalker();
  };

  if (typeof module === 'object') {
    module.exports = definition();
  } else if (typeof window === 'object') {
    window.PageWalker = definition();
  }

  function getDocHeight() {
    return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight);
  }

  function updateProgress() {
    var wh = W.innerHeight;
    var h = height(D.body);
    var sHeight = h - wh;
    var width = Math.max(0, Math.min(1, W.scrollY / sHeight)) * 100 + '%';
    $(selector).style.width = width;
  }

  function height(el) {
    return parseInt(getComputedStyle(el).height);
  }
})(window, document);