import Link from 'next/link';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <Link
        href="/"
        className={css.logo}
      >
        NoteHub
      </Link>
      <nav aria-label="Main navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes">Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
