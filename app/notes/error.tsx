'use client';

interface ErrorPageProps {
  error: Error;
  reset?: () => void;
}

const NotesErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      {reset && (
        <button
          onClick={reset}
          style={{ marginTop: '1rem' }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default NotesErrorPage;
