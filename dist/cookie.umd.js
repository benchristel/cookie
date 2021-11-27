(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.cookie = {}, global.react));
})(this, (function (exports, react) {
  var nonce = 0;
  function useModel(factory) {
    var _useState = react.useState(factory),
        object = _useState[0];

    object.subscribe(function () {
      rerender();
    });

    var _useState2 = react.useState(0),
        setNonce = _useState2[1];

    var rerender = function rerender() {
      return setNonce(++nonce);
    };

    return object.viewModel();
  }

  exports.useModel = useModel;

}));
