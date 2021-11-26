import { useState } from 'react';

var nonce = 0;
function useModel(factory) {
  var _useState = useState(factory),
      object = _useState[0];

  object.subscribe(function () {
    rerender();
  });

  var _useState2 = useState(0),
      setNonce = _useState2[1];

  var rerender = function rerender() {
    return setNonce(++nonce);
  };

  return object.viewModel();
}

export { useModel };
