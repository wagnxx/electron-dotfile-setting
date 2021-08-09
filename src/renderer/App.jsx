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
        <ol>
          <li>添加额文件都是在home文件下，且该文件父级文件夹得存在，读取文件时如果不存在会自动创建文件，不支持自动创建多层文件</li>
          <li>
            Apply 按钮使本地数据同步到本地文件中
          </li>
          <li>
            clean 清空的本地数据，想让本地文件同步清空要在点异常 Apply 按钮
          </li>
          <li>
            Disabled属性 对应文件里的 ‘#’ 符号注释
          </li>
          <li>
            应用刚打开，本地没有数据时会把读取文件存储到本地
          </li>
          <li>......</li>
        </ol>
      </div>
    </div>
  );
};
