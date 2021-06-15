// @flow

import * as React from 'react'
import {useState} from 'react'
import ReactDOM from 'react-dom'
import {GameUI} from './cookie-clicker.jsx'
import {allTestResults} from "./test-framework.js"

ReactDOM.render(
  <GameUI/>,
  document.getElementById("root"),
)

console.log("test results:", allTestResults())
