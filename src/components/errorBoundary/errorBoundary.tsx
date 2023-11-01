import React, { ErrorInfo } from 'react';
// import { SEARCH_VALUE_KEY } from '../../App';

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
      // localStorage.setItem(SEARCH_VALUE_KEY, '');
      return (
        <>
          <h1>Something went wrong...</h1>
          <button
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            back
          </button>
        </>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
