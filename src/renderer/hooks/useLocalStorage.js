import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const preKey = 'sys_file_editor_';
export default function useLocalStorage(key, initial) {
  if (!key || typeof key !== 'string') throw Error('key must be a string');
  let relKey = preKey + key;
  const [value, setValue] = useState(function () {
    let jsonValue = localStorage.getItem(relKey);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
    if (typeof initial === 'function') return initial();

    if (typeof initial === 'undefined') return ''

    return initial;
  });
  useEffect(() => {
    localStorage.setItem(relKey, JSON.stringify(value));
  }, [value, setValue]);

  return [value, setValue];
}
