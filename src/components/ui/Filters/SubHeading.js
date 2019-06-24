// @flow

import React from 'react'

import theme from '../../../styles/theme'
import { typeface } from '../../../styles/typo'

import type { Element } from 'react'

export type Props = {
  children: Element<*>,
  isExpanded: boolean,
  onClick: (event: any) => void
}

const cmz = require('cmz')

const cx = {
  heading: cmz(typeface.extraHeading, `
    & {
      align-items: center
      border-top: 1px solid ${theme.lineSilver2}
      border-bottom: 1px solid ${theme.lineSilver2}
      color: ${theme.typoHighlightOnDarkBackground}
      display: flex
      font-size: 1.0625rem
      padding: 24px 60px
      display: flex
      box-sizing: border-box
    }

    &:first-of-type {
      border-top: none
    }

    &:last-of-type {
      border-bottom: none
    }
  `),

  text: cmz(`
    width: 100%
  `)
}

const SubHeading = (props: Props) => (
  <div onClick={props.onClick} className={cx.heading}>
    <div className={cx.text}>
      {props.children}
    </div>
  </div>
)

export default SubHeading