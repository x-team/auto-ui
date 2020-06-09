import formatDate from 'date-fns/format'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import differenceInMinutes from 'date-fns/difference_in_minutes'
import differenceInHours from 'date-fns/difference_in_hours'
import differenceInDays from 'date-fns/difference_in_days'

import type { Element } from 'react'

export function getComponentDisplayName (Component): string {
  return Component.displayName || Component.name || 'Component'
}

export function pluralize (count: number, noun: string, stripCount: boolean = false, suffix: string = 's'): string {
  return `${stripCount ? '' : `${count} `}${noun}${parseInt(count, 10) !== 1 ? suffix : ''}`
}

export const getClassName = (config: Object) => Object.keys(config)
  .filter(className => config && className && config[className])
  .join(' ')

export function size (collection: null | string | Object | Array<*>): number {
  if (collection == null) return 0

  if (Array.isArray(collection) || typeof collection === 'string') return collection.length

  return Object.keys(collection).length
}

export const replaceBlankLinesForNewLines = (text: ?string): string => text ? text.replace(/(?:\r\n|\r|\n)/g, '<br>\n') : ''

export function timeSince (date: Date | string | number | void | null, addSpaceAfterNumber: boolean = true, addDifferenceInDays: boolean = false): string {
  if (date && !(date instanceof Date)) {
    date = new Date(date)
  }

  const now = new Date()
  const hoursDelta = differenceInHours(now, date)

  if (date && hoursDelta >= 24) {
    if (addDifferenceInDays) {
      const days = differenceInDays(now, date)
      return `${days} day${days > 1 ? 's' : ''} ago`
    }

    return formatDate(date, 'DD MMM YY')
  }

  const minutesDelta = differenceInMinutes(now, date)

  if (date && minutesDelta >= 60) {
    return addSpaceAfterNumber ? `${hoursDelta} h ago` : `${hoursDelta}h ago`
  }

  if (date && differenceInSeconds(now, date) >= 60) {
    return addSpaceAfterNumber ? `${minutesDelta} m ago` : `${minutesDelta}m ago`
  }

  return 'just now'
}

export type ParsedVideoUrlType = {
  videoId: number,
  service: string,
  poster: ?string
}

export function parseVideoUrl (url: string): ParsedVideoUrlType {
  url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/)
  const videoId = RegExp.$6
  let service
  let poster

  if (RegExp.$3.indexOf('youtu') > -1) {
    service = 'youtube'
    poster = `//img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  } else if (RegExp.$3.indexOf('vimeo') > -1) {
    service = 'vimeo'
    // To do: get poster from Vimeo -> https://developer.vimeo.com/api/upload/thumbnails
  }

  return {
    videoId,
    service,
    poster
  }
}

export const olderBrowserErrors: Array<string> = [
  `TypeError: invalid 'instanceof' operand y.Request`,
  `TypeError: y.Request is not a function. (evaluating 't instanceof y.Request')`,
  `TypeError: Expecting a function in instanceof check, but got undefined`,
  `ReferenceError: URLSearchParams is not defined`,
  `TypeError: undefined is not a valid argument for 'instanceof' (evaluating 't instanceof y.Request')`
]
export type ErrorType = {[key: string|number]: string | Array<Element<*>>}

export function getOlderBrowserErrorKey (errors: ErrorType = {}): string | number | null {
  if (!errors) {
    return null
  }

  let matchingKey = null
  Object.keys(errors).forEach((key) => {
    if (olderBrowserErrors.includes(errors[key])) {
      matchingKey = key
    }
  })
  return matchingKey
}
