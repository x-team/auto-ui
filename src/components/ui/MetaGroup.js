// @flow

import React, { PureComponent } from 'react'

import type { Element } from 'react'

const cmz = require('cmz')

const cx = {
  layout: cmz(`
    position: relative
    display: flex
  `),

  mainBodyColumn: cmz(`
    box-sizing: border-box
    flex: 1
    min-width: 60%
  `),

  secondaryColumns: cmz(`
    display: flex
    flex-wrap: wrap
    justify-content: flex-end
    align-items: center
    height: 100%
    width: 300px
  `),

  secondaryColumn: cmz(`
    box-sizing: border-box
    flex-shrink: 0
  `)
}

type Props = {
  mainBodyElement?: Element<*>,
  secondaryElements: Array<Element<*>>
}

class MetaGroup extends PureComponent<Props, void> {
  static defaultProps = {
    secondaryElements: []
  }

  render () {
    const { mainBodyElement, secondaryElements } = this.props
    return (
      <div className={cx.layout} data-testid='xpui-metaGroup__layout'>
        <div className={cx.mainBodyColumn} data-testid='xpui-metaGroup__mainBodyColumn'>
          {mainBodyElement}
        </div>
        <div className={cx.secondaryColumns} data-testid='xpui-metaGroup__secondaryColumns'>
          {secondaryElements.map(element => (
            <div className={cx.secondaryColumn} key={element.key} data-testid='xpui-metaGroup__secondaryColumn'>
              {element}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default MetaGroup
