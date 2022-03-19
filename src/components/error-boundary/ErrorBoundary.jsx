import React from 'react'

import { Button, Box, Flex, VStack } from "@chakra-ui/react";
import Error from '../error/Error'

import addAvalancheNetwork from '../../utilities/injectAvalancheNetwork'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  renderConnectButtons() {
    // const networks = ['local', 'test', 'main']
    const networks = ['main']

    return networks.map((network) => (
      <Button
        key={network}
        onClick={() => addAvalancheNetwork(network)}
      >
        Connect to Avalanche {network} network
      </Button>
    ))
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.boundary}>
          <Error />

          {this.renderConnectButtons()}
        </div>
      )
    }

    return this.props.children
  }
}
