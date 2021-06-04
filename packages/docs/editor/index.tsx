/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Flexbox } from '@stage-ui/core'
import React, { Fragment } from 'react'
import Menu from '../components/TopBar'
import { CustomPageProps } from '../utils/core'
import components from './components'
import AddPanel from './src/AddPanel'
import PrefPanel from './src/PrefPanel'
import RenderPanel from './src/RenderPanel'
import TreePanel from './src/TreePanel'
import styles from './styles'
import { ArchitectItem, ArchitectTools } from './types'

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const context = {
  componentLibraryOpen: false,
  tools: {} as ArchitectTools,
}

class Architect extends React.Component<CustomPageProps> {
  constructor(props: CustomPageProps) {
    super(props)
    // @ts-expect-error
    this.init(require('./demoData').default)
    context.tools = this.tools
  }

  /**
   * This method will set items
   * but not rerender em.
   */
  private init(items: Architect) {
    // @ts-expect-error
    this.items = require('./demoData').default
    // Add parent links
    const recursive = (items: ArchitectItem[]) => {
      items?.forEach((item) => {
        if (Array.isArray(item.children)) {
          for (const child of item.children) {
            child.parent = item
          }
          recursive(item.children)
        }
      })
    }
    recursive(this.items)
  }
  /**
   * Store with all items
   */

  private items: ArchitectItem[] = []

  /**
   * Removes all recoreds
   * with $.dirty flag
   */
  private clearDirtyRecords() {
    const recursive = (items?: ArchitectItem[]) =>
      items?.filter((item) => {
        item.children = recursive(item.children)
        return !item.$.dirty
      })
    this.items = recursive(this.items) as ArchitectItem[]
  }

  public tools: ArchitectTools = {
    components,
    /**
     * Current dragging element
     */
    captured: null,
    /**
     * Current focused element
     */
    focused: null,
    /**
     * Current target element
     * if captured and mouse over
     */
    target: null,
    /**
     * Will return all structure
     */
    getItems: () => this.items,
    move: () => {
      /**
       * Object need for links
       */
      const shared = {
        captured: this.tools.captured,
        target: this.tools.target,
        targetIndex: this.tools.targetIndex || 0,
      }

      this.tools.target = null
      this.tools.targetIndex = 0

      /**
       * Thats for check if parent
       * not dropped in his childs
       */
      const checkSelfDrop = (parent?: ArchitectItem | null) => {
        if (!parent) {
          return true
        }
        if (parent.id === shared.captured?.id) {
          return false
        }
        return checkSelfDrop(parent.parent)
      }
      if (shared.captured) {
        if (shared.target) {
          if (!checkSelfDrop(shared.target.parent)) {
            return
          }
          /**
           * If there is not children prop
           * then we'll try push to parent of target
           */
          if (!shared.target?.children) {
            if (shared.target?.parent) {
              /**
               * Setting index for correct insert position
               */
              shared.target.parent.children?.forEach((child, index) => {
                if (child.id === shared.target?.id) {
                  shared.targetIndex = index + 1
                }
              })
              /**
               * Setting new target
               */
              shared.target = shared.target.parent
            }
          }
          /**
           * Do nothing is element dropped
           * on itself
           */
          if (shared.captured.id === shared.target.id) {
            return
          }
        }
        /**
         * Select root as target if
         * there is no target
         */
        const target = shared.target?.children || this.items

        /**
         * Clone element and
         * them push to target
         */
        target.splice(shared.targetIndex, 0, {
          ...shared.captured,
          parent: shared.target,
          $: {},
        })

        /**
         * replace focused element
         * if exist
         */
        if (this.tools.focused?.id === shared.captured?.id) {
          this.tools.focused = target[shared.targetIndex]
        }
        /**
         * Clear target and
         * remove dirty record
         */
        shared.captured.$.dirty = true
        this.clearDirtyRecords()
        this.tools.update()
      }
    },
    duplicate: () => {
      const parent = this.tools.focused?.parent
      if (parent) {
        for (const index in parent.children) {
          if (this.tools.focused && this.tools.focused?.id === parent.children[index].id) {
            parent?.children?.splice(parseInt(index) + 1, 0, {
              ...this.tools.focused,
              id: uuid(),
              $: {},
              children: this.tools.focused.children ? [] : undefined,
            })
            this.tools.update()
            break
          }
        }
      }
    },
    update: () => {
      this.forceUpdate()
      /**
       * We should clear captured after
       * any updates, was causes
       * issue with leak an old object
       */
      this.tools.captured = null
    },
    remove: () => {
      if (this.tools.focused) {
        this.tools.focused.$.dirty = true
        this.tools.focused = null
        this.clearDirtyRecords()
        this.tools.update()
      }
    },
    componentLibraryShow: () => {
      context.componentLibraryOpen = true
      this.forceUpdate()
    },
    componentLibraryHide: () => {
      context.componentLibraryOpen = false
      this.forceUpdate()
    },
    /**
     * TODO: Some day
     */
    undo: () => void 0,
    redo: () => void 0,
  }

  render() {
    return <ArchitectView {...this.props} />
  }
}

/**
 * That is just for hooks
 */
const ArchitectView = (props: CustomPageProps) => {
  const cs = React.useMemo(() => styles(props.theme), [props.theme])

  return (
    <>
      <Menu
        currentTheme={props.theme}
        setIndex={() => props.setPath('/')}
        setTheme={props.setTheme}
        themes={props.themes}
        title={props.config.name}
        git={props.config.git}
      />
      <Flexbox css={cs.container}>
        <TreePanel />
        <RenderPanel />
        <PrefPanel />
      </Flexbox>
      {context.componentLibraryOpen && <AddPanel />}
    </>
  )
}

export default Architect
