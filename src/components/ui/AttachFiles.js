// @flow

import React, { PureComponent } from 'react'

import Button from './Button'
import SvgIcon from './SvgIcon'

import theme from '../../styles/theme'
import typo from '../../styles/typo'
import elem from '../../utils/elem'

import type { Element } from 'react'
import type { Icon } from './SvgIcon'

const cmz = require('cmz')

type File = {
  filename: string,
  path?: string,
  progress?: number
}

type Props = {
  files?: Array<File>,
  onUpload: void,
  onCancel: void,
  onDelete: void
}

const Root = elem.div()

const FilesList = elem.div(cmz(`
  margin-bottom: 30px
`))

const FileItem = elem.div(cmz(`
  position: relative
  display: flex
  align-items: start
  height: 20px
  margin-bottom: 20px
  border-bottom: 2px solid ${theme.baseSilver}
`))

const FileName = elem.div(cmz(
  typo.baseText,
  `
    width: 100%
    font-size: 16px
    line-height: 1
  `
))

const FileAction = elem.div(cmz(`
  cursor: pointer
`))

const FileProgress = elem.div(cmz(`
  position: absolute
  bottom: -2px
  display: block
  height: 2px
  width: 0
  background-color: ${theme.baseRed}
  transition: width 0.5s
`))

const ButtonLabel = elem.span(cmz(`
  padding: 0 20px
`))

class AttachFiles extends PureComponent<Props> {
  static defaultProps = {
    files: [],
    onUpload: () => {},
    onCancel: () => {},
    onDelete: () => {}
  }

  render () {
    const { files, onUpload, onCancel, onDelete } = this.props

    const renderButton = (file:File) => {
      if (!file.progress || file.progress == 100) {
        return (
          FileAction(
            {
              onClick: () => onDelete(`${file.path}/${file.filename}`)
            },
            <SvgIcon icon="trashcan" color="grayscale" />
          )
        )
      } else {
        return (
          FileAction(
            {
              onClick: () => onCancel(`${file.path}/${file.filename}`)
            },
            <SvgIcon icon="x" color="grayscale" />
          )
        )
      }
    }

    const renderProgress = (progress = 0) => {
      if (progress != 100) {
        return FileProgress({
          style: {
            width: `${progress}%`
          }
        })
      }
    }

    const renderFiles = (files) => {
      return files.length > 0 && (
        FilesList(
          files.map(file => {
            return (
              FileItem(
                {
                  key: `${file.path}/${file.filename}`,
                  style: {
                    borderBottomColor: file.progress !== 100 ? theme.baseSilver : 'transparent'
                  }
                },
                FileName(file.filename),
                renderButton(file),
                renderProgress(file.progress)
              )
            )
          })
        )
      )
    }

    return Root(
      renderFiles(files),
      <Button outlined onClick={onUpload}>{ButtonLabel('Attach a file')}</Button>
    )
  }
}

export default AttachFiles
