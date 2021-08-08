import React from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect } from 'react';

const menuContext = createContext();

export const useMenuContext = () => {
  return useContext(menuContext);
};

export default function MemuContextProvider({ children }) {
  const [menuList, setMenuList] = useLocalStorage('menuList', [
    { path: 'a.txt', checked: true }
  ]);
  const [menuListSelectedIndex, setMenuListSelectedIndex] = useLocalStorage(
    'menuList-selected',
    0
  );

  const setMenuItemPath = (path) => {
    if (!path || typeof path !== 'string') return;
    setMenuList((preList) => {
      let rawList = [...preList];
      let currentRow = rawList[menuListSelectedIndex];
      currentRow.path = path;
      return rawList;
    });
  };

  const setContentItemByKey = ({ key, value, index }) => {
    let currentContents = menuList[menuListSelectedIndex].contents || [];
    let newContents = [...currentContents];
    newContents[index][key] = value;

    setMenuList((preList) => {
      let rawList = [...preList];
      let currentRow = rawList[menuListSelectedIndex];
      currentRow.contents = newContents;
      return rawList;
    });
  };

  const addKeyToContent = (row) => {
    let key = row.key;
    let currentContents = menuList[menuListSelectedIndex].contents || [];
    if (currentContents.map((item) => item.key).includes(key)) return;

    let newContents = [...currentContents];
    newContents.push(row);

    setMenuList((preList) => {
      let rawList = [...preList];
      let currentRow = rawList[menuListSelectedIndex];
      currentRow.contents = newContents;
      return rawList;
    });
  };

  useEffect(() => {
    setMenuList((preVals) => {
      let raws = [...preVals];
      let checkedRow = raws.find((item) => item.checked);
      if (checkedRow) {
        checkedRow.checked = false;
      }
      raws[menuListSelectedIndex].checked = true;
      return raws;
    });
  }, [menuListSelectedIndex]);

  const value = {
    menuList,
    setMenuList,
    menuListSelectedIndex,
    setMenuListSelectedIndex,
    currentFile: menuList[menuListSelectedIndex],
    addKeyToContent,
    setContentItemByKey,
    setMenuItemPath
  };
  return <menuContext.Provider value={value}>{children}</menuContext.Provider>;
}
