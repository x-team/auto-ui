// @flow
/* global React$Node */
/* global React$StatelessFunctionalComponent */

import React from 'react'
import PropTypes from 'prop-types'

import HeaderBar from './HeaderBar'
import ApplicantScreenNotification from './ApplicantScreenNotification'

import { breakpoints } from '../../styles/theme'

const cmz = require('cmz')

const cx = {
  layout: cmz(`
    display: flex
    flex-direction: column
    min-height: 100vh
  `),

  header: cmz(`
    & {
      z-index: 2
      position: relative
      height: 50px
      display: flex
      flex-direction: column
    }

    @media screen and (min-width: ${breakpoints.sm}) {
      & {
        height: auto
      }
    }
  `),

  notification: cmz(`
    z-index: 1
  `),

  content: cmz(`
    max-width: 1280px
    margin: 93px auto 0
  `),

  narrower: cmz(`
    max-width: 840px
    margin: 93px auto 0
    padding: 0 60px 80px 60px
  `),

  wider: cmz(`
    max-width: 964px
    margin: 0 auto
    padding: 0 60px
    padding-top: 118px
  `)
}

type Link = {
  label: string,
  href?: string,
  to?: string
}

type Props = {
  children?: React$Node,
  noWrapper?: boolean,
  wrapper?: 'narrower' | 'wider',
  notification?: React$Node,
  menuLinks?: Array<Link>,
  appLink?: React$StatelessFunctionalComponent<*>
}

const ApplicantScreen = ({
  children,
  wrapper,
  noWrapper = false,
  notification,
  menuLinks,
  appLink
}: Props) => {
  const getWrapperClass = () => (wrapper && cx[wrapper]) || cx.content
  return (
    <div className={cx.layout}>
      <div className={cx.header}>
        <HeaderBar
          links={menuLinks}
          appLink={appLink}
        />
      </div>
      {notification && (
        <div className={cx.notification}>
          <ApplicantScreenNotification>
            {notification}
          </ApplicantScreenNotification>
        </div>
      )}
      {noWrapper ? children : (
        <div className={getWrapperClass()}>{children}</div>
      )}
    </div>
  )
}

ApplicantScreen.propTypes = {
  children: PropTypes.node,
  noWrapper: PropTypes.bool,
  wrapper: PropTypes.string,
  notification: PropTypes.node
}

export default ApplicantScreen
