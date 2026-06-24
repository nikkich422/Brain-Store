import { Component } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

/**
 * ErrorBoundary — catches unexpected React errors during rendering.
 * Without this, one crash kills the whole app silently.
 * Must be a class component (React requirement for error boundaries).
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production you'd send this to a logging service like Sentry
    if (process.env.NODE_ENV !== "production") {
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
          <MdOutlineErrorOutline className="text-8xl text-orange-400" />
          <h1 className="text-3xl font-bold text-gray-800">Something went wrong</h1>
          <p className="text-gray-500 max-w-md">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {process.env.NODE_ENV !== "production" && (
            <pre className="text-xs text-left bg-gray-100 p-4 rounded-lg max-w-lg overflow-auto text-red-600">
              {this.state.error?.message}
            </pre>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
