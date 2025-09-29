'use client';

import { useState, useEffect } from 'react';
import css from './Footer.module.css';

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <p>© {year ?? '...'} NoteHub. All rights reserved.</p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit NoteHub GitHub repository"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
