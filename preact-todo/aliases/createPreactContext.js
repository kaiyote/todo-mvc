/* eslint-disable camelcase */
import preactCompat, { DOM, PropTypes, Children, render, createClass, createPortal, createFactory,
  createElement, cloneElement, isValidElement, findDOMNode, unmountComponentAtNode, Component,
  PureComponent, unstable_renderSubtreeIntoContainer, unstable_batchedUpdates, __spread } from 'preact-compat'
import { createContext } from 'preact-context'

// this right here, is hacky AF, probably don't do this for real
// but this makes styled-components work (this and the combined re-export of preact-context stuff)
const forwardRef = render => render

let contextCompat = { ...preactCompat, createContext, forwardRef }

export default contextCompat
export { DOM, PropTypes, Children, render, createClass, createPortal, createFactory, createElement,
  cloneElement, isValidElement, findDOMNode, unmountComponentAtNode, Component, PureComponent,
  unstable_batchedUpdates, unstable_renderSubtreeIntoContainer, __spread, createContext, forwardRef }
