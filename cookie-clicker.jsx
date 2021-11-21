// @flow

import * as React from "react";
import { useModel } from "./useModel.js";
import { test, expect, toEqual } from "./test-framework.js";

type Game = {|
  subscribe: (fn: () => mixed) => void,
  viewModel: () => {
    cookies: number,
    canEatCookie: boolean,
    makeCookie: () => mixed,
    eatCookie: () => mixed,
  },
  cookies: () => number,
  makeCookie: () => mixed,
  eatCookie: () => mixed,
  canEatCookie: () => boolean,
|};

export function newGame(): Game {
  let _cookies = 0;
  let _subscriber = () => {};

  setInterval(() => {
    makeCookie();
  }, 1000);

  return {
    subscribe,
    viewModel,

    cookies,
    canEatCookie,

    makeCookie,
    eatCookie,
  };

  function subscribe(subscriber) {
    _subscriber = subscriber;
  }

  function viewModel() {
    return {
      cookies: cookies(),
      canEatCookie: canEatCookie(),
      makeCookie,
      eatCookie,
    };
  }

  function cookies() {
    return _cookies;
  }

  function makeCookie() {
    _cookies++;
    _subscriber();
  }

  function eatCookie() {
    if (!canEatCookie()) return;
    _cookies--;
    _subscriber();
  }

  function canEatCookie() {
    return _cookies > 0;
  }
}

test("a game", {
  "starts with no cookies"() {
    expect(newGame().cookies(), toEqual(0));
  },

  "adds cookies that are made"() {
    const game = newGame();
    game.makeCookie();
    const { cookies } = game.viewModel();
    expect(cookies, toEqual(1));
  },

  "subtracts cookies eaten"() {
    const game = newGame();
    game.makeCookie();
    expect(game.canEatCookie(), toEqual(true));
    game.eatCookie();
    expect(game.cookies(), toEqual(0));
  },

  "does not allow negative cookies"() {
    const game = newGame();
    expect(game.canEatCookie(), toEqual(false));
    game.eatCookie();
    expect(game.cookies(), toEqual(0));
  },
});

export function GameUI(): React.Node {
  const { cookies, canEatCookie, makeCookie, eatCookie } = useModel(newGame);

  return (
    <>
      <p>Cookies: {cookies}</p>
      <button onClick={makeCookie}>Make a Cookie</button>
      <button onClick={eatCookie} disabled={!canEatCookie}>
        Eat a Cookie
      </button>
    </>
  );
}
