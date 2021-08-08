import React from 'react';
import EditorComponent from './components/EditorComponent';
import './App.scss';
import MenuList from './components/MenuList';
import useLocalStorage from './hooks/useLocalStorage';
import { useEffect } from 'react';
import { useRef } from 'react';
import MartEditor from './components/MartEditor';
import { useMenuContext } from './contexts/memuContext';

export default () => {
  const { setMenuList, menuListSelectedIndex } = useMenuContext()
  const inputRef = useRef();

  const defaultSlected = menuListSelectedIndex === 0;

  const addMenuItemHandle = e => {
    const item = inputRef.current.value;
    if (!/\/\.\w+$/.test(item)) return
    if (item.length) {
      setMenuList(preValue => {
        if (!preValue.map(preItem => preItem.path).includes(item)) {
          return [...preValue, { path: item, checked: false }];
        }

        return preValue;
      })
    }
  }
  return (
    <div className="app">
      <div className="sider">
        <MenuList />
        <div className="action">
          <input type="text" ref={inputRef} placeholder="please input file path"></input>
          <button onClick={addMenuItemHandle}>Add</button>
        </div>
      </div>
      <div className="content">
        {
          defaultSlected ?
            <EditorComponent />
            :
            <MartEditor />
        }
      </div>
      <div className="other">
        <h2>备注</h2>
      </div>
    </div>
  );
};
