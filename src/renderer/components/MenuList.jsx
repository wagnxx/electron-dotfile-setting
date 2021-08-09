import React from 'react'
import './menu-list.scss'
import { useMenuContext } from '../contexts/memuContext'
export default function MenuList() {

  const { menuList, setMenuListSelectedIndex, menuListSelectedIndex, removeMenuItem } = useMenuContext();
  const checkedHandle = (item, index) => {
    if (item.checked) {
      return;
    }
    setMenuListSelectedIndex(index)
  }

  const removeMenuItemHandle = (e, item, index) => {
    e.stopPropagation()
    removeMenuItem(item, index)
  }

  return (
    <div className="menu-list">
      <h3>MenuList</h3>
      <ul>
        {
          menuList.map((item, index) => (
            <li
              key={item.path} className={index === menuListSelectedIndex ? 'active' : ''}
              onClick={e => checkedHandle(item, index)
              }


            >{item.path}
              <span className="del"
                onClick={e => removeMenuItemHandle(e, item, index)}
              >x</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
