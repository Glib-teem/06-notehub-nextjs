'use client';

import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div
      className={css.error}
      role="alert"
      aria-live="assertive"
    >
      <h3 className={css.title}>Error</h3>
      <p className={css.message}>{message}</p>
      {onRetry && (
        <button
          className={css.retryButton}
          onClick={onRetry}
          aria-label="Retry loading notes"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
