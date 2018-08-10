// @flow

import React, { Component } from 'react'

import SelectBox from './SelectBox'
import Tabs from './Tabs'
import Tab from './Tabs/Tab'
import Button from './Button'
import Loader from './Loader'

import typo from '../../styles/typo'
import theme from '../../styles/theme'
import { pluralize } from '../../utils/helpers'

const cmz = require('cmz')

export type Status = 'archiving' | 'deleting'

type Item = {
  id: number,
  value: string,
  selected?: boolean,
  selecting?: boolean,
  editing?: boolean | string,
  creating?: boolean,
  hidden?: boolean,
  archived?: boolean
}

type Props = {
  status?: Status,
  collectionName?: string,
  list: Array<Item>,
  onEdit: Function,
  onArchive: Function,
  onDelete: Function,
  onCreateNew: Function
}

type DeleteConfirmation = {
  activeList: boolean,
  archiveList: boolean
}

type State = {
  search: string,
  confirmDeletion: DeleteConfirmation,
  activeList: Array<Item>,
  archiveList: Array<Item>
}

const cx = {
  listseditor: cmz(`
    position: relative
    width: 500px
    max-width: 100%
  `),
  heading: cmz(
    typo.sectionHeading,
    `
      margin: 0
      padding: 20px
      line-height: 1
    `
  ),
  listing: cmz(``),
  control: cmz(`
    display: flex
    justify-content: space-between
    align-items: center
    min-height: 60px
    margin: 0
    padding: 20px
  `),
  button: cmz(`
    & {
      border-color: transparent
      margin: 0
    }

    &:hover {
      border-color: transparent
    }
  `),
  archive: cmz(`
    padding-right: 70px
    padding-left: 70px
    margin: 0
  `),
  tabs: cmz(`
    & {
      margin: 0
    }

    & nav {
      margin: 0
      padding: 0
    }

    & nav ul {
      display: flex
      justify-content: space-around
      background: silver
      background-color: ${theme.baseBright}
      border-color: ${theme.baseBright}
      margin: 0
    }

    & nav ul li {
      margin: 0
      padding: 0
      text-align: center
    }

    & nav ul li a {
      padding: 10px 40px
    }

    & > div > div {
      margin: 0
    }
  `),
  confirm: cmz(`
    display: flex
  `),
  deleting: cmz(`
    & p {
      margin: 0
    }
  `),
  cancel: cmz(`
    & > * {
      margin-left: 10px
    }
  `),
  saving: cmz(`
    position: absolute
    top: 0
    width: 100%
    height: 100%
    background: rgba(255, 255, 255, 0.75)
    z-index: 10
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
  `),
  savingMessage: cmz(
    typo.sectionHeading,
    `
      text-align: center
      margin: 0
      padding: 0
    `
  )
}

class ListsEditor extends Component<Props, State> {
  static defaultProps = {
    status: '',
    collectionName: 'Collection',
    list: []
  }

  state = {
    search: '',
    confirmDeletion: {
      activeList: false,
      archiveList: false
    },
    activeList: this.props.list.filter(item => !item.archived),
    archiveList: this.props.list.filter(item => item.archived)
  }

  getSelection = (active: boolean = true) => {
    const { activeList, archiveList } = this.state
    return active
      ? activeList.filter(each => each.selected)
      : archiveList.filter(each => each.selected)
  }

  handleSearch = (search: string) => {
    this.setState({ search })
  }

  handleSelect = (item: Item, active: boolean = true) => {
    const { activeList, archiveList } = this.state
    const updatedList = active
      ? { activeList: activeList.map(each => each.id === item.id ? { ...item } : each) }
      : { archiveList: archiveList.map(each => each.id === item.id ? { ...item } : each) }
    const selection = active
      ? (updatedList.activeList ? updatedList.activeList.filter(each => each.selected) : [])
      : (updatedList.archiveList ? updatedList.archiveList.filter(each => each.selected) : [])
    this.setState(preState => ({
      ...preState,
      ...updatedList,
      confirmDeletion: {
        activeList: preState.confirmDeletion.activeList && selection.length > 0,
        archiveList: preState.confirmDeletion.archiveList && selection.length > 0
      }
    }))
  }

  handleEdit = (item: Item) => {
    const { onEdit } = this.props
    onEdit && onEdit(item)
  }

  handleArchiveItem = (item: Item) => {
    const { onArchive } = this.props
    onArchive && onArchive([item])
  }

  handleArchive = (event: any, active: boolean = true) => {
    event && event.stopPropagation()
    const { onArchive } = this.props
    onArchive && onArchive(this.getSelection(active))
  }

  handleDeleteItem = (item: Item) => {
    const { onDelete } = this.props
    onDelete && onDelete([item])
  }

  handleDelete = (event: any, active: boolean = true) => {
    event && event.stopPropagation()
    const updatedList = active
      ? { activeList: true }
      : { archiveList: true }
    this.setState(preState => ({
      confirmDeletion: {
        ...preState.confirmDeletion,
        ...updatedList
      }
    }))
  }

  confirmDelete = (event: any, active: boolean = true) => {
    event && event.stopPropagation()
    const { onDelete } = this.props
    onDelete && onDelete(this.getSelection(active))
  }

  cancelDelete = (event: any, active: boolean = true) => {
    event && event.stopPropagation()
    const updatedList = active
      ? { activeList: false }
      : { archiveList: false }
    this.setState(preState => ({
      confirmDeletion: {
        ...preState.confirmDeletion,
        ...updatedList
      }
    }))
  }

  handleCreateNew = (name: string) => {
    const { onCreateNew } = this.props
    onCreateNew && onCreateNew(name)
  }

  renderListing = (active: boolean = true) => {
    const { collectionName } = this.props
    const { confirmDeletion, activeList, archiveList } = this.state
    const selection = this.getSelection(active)
    return (
      <div className={cx.listing}>
        <SelectBox
          items={active ? activeList : archiveList}
          collectionName={collectionName}
          expanded
          visibleItems={7}
          search={this.state.search}
          onSearch={search => this.handleSearch(search)}
          onSelect={item => this.handleSelect(item, active)}
          onEdit={item => this.handleEdit(item)}
          onArchive={item => this.handleArchiveItem(item)}
          onDelete={item => this.handleDeleteItem(item)}
        />
        {(active
          ? confirmDeletion.activeList
          : confirmDeletion.archiveList
        ) ? (
          <div className={cx.control}>
            <div className={cx.deleting}>
              <p>Delete <strong>{selection.length}</strong> {pluralize(selection.length, 'list', true)}</p>
              <p><strong>Are you sure?</strong></p>
            </div>
            <div className={cx.cancel}>
              <Button
                onClick={(e) => this.cancelDelete(e, active)}
                pseudolink
                className={cx.button}
              >
                CANCEL
              </Button>
              <Button
                onClick={(e) => this.confirmDelete(e, active)}
                className={[cx.button, cx.archive].join(' ')}
              >
                Yes
              </Button>
            </div>
          </div>
        ) : (
          <div className={cx.control}>
            <Button
              disabled={selection.length === 0}
              onClick={(e) => this.handleDelete(e, active)}
              className={cx.button}
              outlined
            >
              Delete
            </Button>
            <Button
              disabled={selection.length === 0}
              onClick={(e) => this.handleArchive(e, active)}
              className={[cx.button, cx.archive].join(' ')}
            >
              {active ? 'Archive' : 'Unarchive' }
            </Button>
          </div>
        )}
      </div>
    )
  }

  render () {
    const { collectionName } = this.props
    return (
      <div className={cx.listseditor}>
        <h1 className={cx.heading}>Edit {collectionName}</h1>
        <Tabs className={cx.tabs} tabIndex={1}>
          <Tab title='Active'>
            {this.renderListing(true)}
          </Tab>
          <Tab title='Archive'>
            {this.renderListing(false)}
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default ListsEditor
