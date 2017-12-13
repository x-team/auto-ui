import { PureComponent } from 'react'
import md5 from 'crypto-js/md5'

import elem from '../utils/elem'

import theme from '../styles/theme'
import typo from '../styles/typo'

import type { Element } from 'react'

type Props = {
  avatar?: Element<*>,
  firstName: ?string,
  lastName: ?string,
  email: ?string,
  active: ?boolean
}

const cmz = require('cmz')

const cx = {
  isActive: cmz(`background-color: ${theme.baseHighlight}`)
}

const Root = elem.div(cmz(`
  display: flex
  flex-direction: row
  font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif
  margin: .5em .5em .5em 0
`))

const Avatar = elem.img()

const Info = elem.div(cmz(`
  margin: 0 1em
  padding-top: .5em
  padding-right: .5em
  color: ${theme.typoHighlight}
`))

const Name = elem.div(cmz(
  typo.badgeHeading,
  `
    margin-bottom: .2em
  `
))

const Email = elem.div(cmz(`
  font-size: .9em
`))

export default class ApplicantBadge extends PureComponent<Props> {
  static defaultProps = {
    firstName: '',
    lastName: '',
    active: false
  }

  render () {
    const {
      active,
      avatar,
      children,
      email,
      firstName,
      lastName
    } = this.props

    const shouldRenderName = firstName || lastName
    const fullName = `${firstName} ${lastName}`
    const avatarCaption = shouldRenderName ? `${fullName}'s avatar` : 'avatar'
    const activeClassName = active ? cx.isActive : ''

    return Root(
      { className: activeClassName },
      avatar || Avatar({
        alt: avatarCaption,
        src: `https://www.gravatar.com/avatar/${md5(email)}?s=64`
      }),
      Info(
        { className: activeClassName },
        shouldRenderName && Name(fullName),
        Email(email),
        children
      )
    )
  }
}
