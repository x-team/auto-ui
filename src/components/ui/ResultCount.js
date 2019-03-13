// @flow

import React from 'react'
import isNumber from 'lodash.isnumber'

const cmz = require('cmz')

const cx = {
  wrapper: cmz(`
    font-size: 1.0625rem;
  `),

  content: cmz(`
    font-weight: 600;
    margin-right: 5px;
  `)
}

type Props = {
  items?: number
}

const ResultCount = ({ items }: Props) => {
  const itemsCount = isNumber(items) ? items : 0
  const resultText = parseInt(itemsCount, 10) !== 1 ? 'items' : 'item'

  return (
    <span className={cx.wrapper}>
      <span className={cx.content}>{itemsCount}</span>
      {resultText}
    </span>
  )
}

export default ResultCount
