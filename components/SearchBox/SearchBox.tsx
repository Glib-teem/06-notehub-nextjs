'use client';

import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
}

const SearchBox = ({
  value,
  onChange,
  placeholder = 'Search notes',
  id = 'search-notes',
  name = 'search',
}: SearchBoxProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={css.wrapper}>
      <label
        htmlFor={id}
        className={css.label}
        hidden
      >
        {placeholder}
      </label>
      <input
        className={css.input}
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        aria-label={placeholder}
      />
    </div>
  );
};

export default SearchBox;
