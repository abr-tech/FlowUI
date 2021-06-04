import React from 'react'
import { Flexbox, Text, Block, Divider } from '@stage-ui/core'
import { Code } from '@stage-ui/icons'

interface ErrorBoundaryProps {
  error?: string | null
  children: React.ReactNode
  onError?: (error: string) => void
}

interface ErrorBoundaryState {
  error: string | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  handleTopLevelError(event) {
    event.preventDefault()
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({ error: null })
    window.addEventListener('error', this.handleTopLevelError)
  }

  componentDidUpdate() {
    window.removeEventListener('error', this.handleTopLevelError)
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error.toString() })
    this.props.onError?.(error.toString())
    return true
  }

  render() {
    if (this.state.error || this.props.error) {
      return (
        <Block p="2rem" h="100%" backgroundColor={(c) => c.surface}>
          <Text color={(c) => c.error}>{this.state.error || this.props.error}</Text>
          <Divider color={(c) => c.lightest} my="0.5rem" />
          <Flexbox
            mb="1rem"
            borderRadius="4px"
            alignItems="center"
            justifyContent="space-between"
            // backgroundColor={c=>c.error.alpha(0.1)}
            // textColor={c => c.error}
          >
            <Text color={(c) => c.light} size="s">
              Looks like you typed wrong
            </Text>
            <Code color={(c) => c.light} ml="0.5rem" />
          </Flexbox>
        </Block>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
