import React, { ErrorInfo } from 'react';

import styles from './errorBoundary.module.scss';

class ErrorBoundary extends React.Component<
  { children: JSX.Element },
  { hasError: boolean }
> {
  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorWindow}>
          <h2>&quot;That&apos;s not how the Force works!&quot; - Han Solo</h2>
          <button
            className={styles.button}
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            back
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
