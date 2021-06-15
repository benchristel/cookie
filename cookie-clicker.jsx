// @flow

import * as React from "react"
import {useObject} from "./useObject.js"
import {test, expect, toEqual} from "./test-framework.js"

type Game = {|
  cookies: () => number,
  makeCookie: () => mixed,
  eatCookie: () => mixed,
  canEatCookie: () => boolean,
|}

export function newGame(): Game {
  let _cookies = 0;
  return {
    cookies,
    makeCookie,
    eatCookie,
    canEatCookie,
  }

  function cookies() {
    return _cookies
  }

  function makeCookie() {
    _cookies++
  }

  function eatCookie() {
    if (!canEatCookie()) return;
    _cookies--
  }

  function canEatCookie() {
    return _cookies > 0
  }
}

test("a game", {
  "starts with no cookies"() {
    expect(newGame().cookies(), toEqual(0))
  },

  "adds cookies that are made"() {
    const game = newGame()
    game.makeCookie()
    expect(game.cookies(), toEqual(1))
  },

  "subtracts cookies eaten"() {
    const game = newGame()
    game.makeCookie()
    expect(game.canEatCookie(), toEqual(true))
    game.eatCookie()
    expect(game.cookies(), toEqual(0))
  },

  "does not allow negative cookies"() {
    const game = newGame()
    expect(game.canEatCookie(), toEqual(false))
    game.eatCookie()
    expect(game.cookies(), toEqual(0))
  },
})

export function GameUI(): React.Node {
  const [game, withUpdate] = useObject(newGame)
  return <>
    <p>Cookies: {game.cookies()}</p>
    <button onClick={withUpdate(game.makeCookie)}>
      Make a Cookie
    </button>
    <button onClick={withUpdate(game.eatCookie)} disabled={!game.canEatCookie()}>
      Eat a Cookie
    </button>
  </>
}
