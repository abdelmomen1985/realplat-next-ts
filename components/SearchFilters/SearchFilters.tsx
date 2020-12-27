import React from 'react';
import DropDown from './DropDown';
export default function SearchFilters() {
  const list = [
    {
      label: 'content',
      value: 'content',
      key: '1',
    },
    {
      label: 'content 2',
      value: 'content 2',
      key: '2',
    },
    {
      label: 'content 3',
      value: 'content 3',
      key: '3',
    },
  ];
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <DropDown title="Select location" list={list} />
      </div>
    </section>
  );
}
