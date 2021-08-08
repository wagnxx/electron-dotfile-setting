import React from 'react'
import './menu-list.scss'
import { useMenuContext } from '../contexts/memuContext'
export default function MenuList() {

  const { menuList,setMenuListSelectedIndex,menuListSelectedIndex } = useMenuContext();
  const checkedHandle = (item, index) => {
    if (item.checked) {
      alert('已经选中了')
      return;
    }
    setMenuListSelectedIndex(index)
  }
  return (
    <div className="menu-list">
      <h3>MenuList</h3>
      <ul>
        {
          menuList.map((item, index) => (
            <li
              key={item.path} className={index === menuListSelectedIndex ? 'active' : ''}
              onClick={e => checkedHandle(item, index)}

            >{item.path}</li>
          ))
        }
      </ul>
    </div>
  )
}
