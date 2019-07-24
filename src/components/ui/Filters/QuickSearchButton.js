// @flow

import React, { PureComponent } from 'react'
import SvgIcon from '../SvgIcon'
import theme from '../../../styles/theme'

const cmz = require('cmz')

type Props = {
  onClick: Function
}

const Container = cmz(`
  & {
    height: 44px
    width: 44px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    margin-left: auto
    margin-right: 10px

    background: ${theme.baseBrighter}
    border: 1px solid ${theme.lineSilver2}
    border-radius: 50%
  }

  & svg {
    display: block
  }
`)

export default class QuickSearchButton extends PureComponent<Props> {
  render () {
    return (
      <div className={Container} onClick={this.props.onClick}>
        <SvgIcon color='grayscarpaflow' icon='magnifier' hover='default' />
      </div>
    )
  }
}