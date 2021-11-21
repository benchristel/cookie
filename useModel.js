// @flow

import { useState } from "react";

export type Wrapper = <F: Function>(F) => F;

let nonce: number = 0;
export function useModel<
  ViewModel,
  Model: { subscribe: (() => mixed) => void, viewModel: () => ViewModel }
>(factory: () => Model): ViewModel {
  const [object] = useState(factory);
  object.subscribe(() => {
    rerender();
  });
  const [_, setNonce] = useState(0);
  const rerender = () => setNonce(++nonce);
  const withUpdate: any =
    (f) =>
    (...args) => {
      const result = f(...args);
      rerender();
      return result;
    };
  return object.viewModel();
}
