import { useState } from 'react';

let nonce = 0;
function useModel(factory) {
  const [object] = useState(factory);
  object.subscribe(() => {
    rerender();
  });
  const [_, setNonce] = useState(0);

  const rerender = () => setNonce(++nonce);

  return object.viewModel();
}

export { useModel };
