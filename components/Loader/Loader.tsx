import css from './Loader.module.css';

interface LoaderProps {
  message?: string;
}

const Loader = ({ message = 'Loading...' }: LoaderProps) => {
  return (
    <div
      className={css.loader}
      role="status"
      aria-live="polite"
    >
      <div
        className={css.spinner}
        aria-hidden="true"
      ></div>
      <p className={css.message}>{message}</p>
    </div>
  );
};

export default Loader;
