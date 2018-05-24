// @flow

import React, { PureComponent } from 'react'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import differenceInMinutes from 'date-fns/difference_in_minutes'
import differenceInHours from 'date-fns/difference_in_hours'
import formatDate from 'date-fns/format'

import Avatar from './Avatar'

import typo from '../../styles/typo'
import elem from '../../utils/elem'

const cmz = require('cmz')

type Props = {
  avatar?: string,
  date?: Date,
  name?: string,
  text?: string
}

const Root = elem.div(cmz(`
  display: flex
`))

const AvatarWrapper = elem.div(cmz(`
  margin-right: 16px
  flex-shrink: 0
`))

const Body = elem.div(cmz(`
  display: flex
  flex-direction: column
`))

const Name = elem.span(cmz(
  typo.headline,
  `
    font-size: 16px
    line-height: normal
    margin: 0
    text-transform: uppercase
  `
))

const Time = elem.span(cmz(
  typo.baseText,
  `
    font-size: 12px
    line-height: 12px
    margin-top: 8px
  `
))

const Text = elem.p(typo.baseText)

const timeFromNow = date => {
  const now = new Date()
  const hoursDelta = differenceInHours(now, date)

  if (hoursDelta >= 24) {
    return formatDate(date, 'DD MMM YY')
  }

  const minutesDelta = differenceInMinutes(now, date)

  if (minutesDelta >= 60) {
    return `${hoursDelta} h ago`
  }

  if (differenceInSeconds(now, date) >= 60) {
    return `${minutesDelta} m ago`
  }

  return 'just now'
}

class Note extends PureComponent<Props> {
  interval: number

  componentDidMount () {
    const { date } = this.props

    if (date) {
      const now = new Date()
      const hoursDelta = differenceInHours(now, date)
      if (hoursDelta < 1) {
        this.interval = window.setInterval(() => this.forceUpdate(), 60 * 1000) // 1 minute
      } else if (hoursDelta < 24) {
        this.interval = window.setInterval(() => this.forceUpdate(), 20 * 60 * 1000) // 20 minutes
      }
    }
  }

  componentWillUnmount () {
    if (this.interval) {
      window.clearInterval(this.interval)
    }
  }

  render () {
    const { avatar, date, name, text } = this.props

    return (
      Root(
        avatar && AvatarWrapper(
          <Avatar alt={name} src={avatar} size={40} />
        ),
        Body(
          name && Name(name),
          date && Time(timeFromNow(date)),
          text && Text({}, text)
        )
      )
    )
  }
}

export default Note
