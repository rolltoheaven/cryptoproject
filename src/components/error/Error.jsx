import React from 'react'

export default function Error() {
  const renderErrorActions = () => {
    return [
      'Check that you have MetaMask installed and unlocked',
      'Check that you have MetaMask set to an Avalanche network',
      'Refresh the page',
      'Click on "Connect Wallet"',
    ].map((action) => (
      <li key={action} className={styles.errorAction}>
        {action}
      </li>
    ))
  }

  return (
    <div>
      <h1>
        Something went wrong. Perform the following actions:
      </h1>

      <ul>{renderErrorActions()}</ul>
    </div>
  )
}
