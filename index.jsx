// @flow

import * as React from 'react'
import {useState} from 'react'
import ReactDOM from 'react-dom'
import {GameUI} from './cookie-clicker.jsx'

ReactDOM.render(
  <App/>,
  document.body,
)

function App(): React.Node {
  return <>
    <GameUI />
  </>
}
