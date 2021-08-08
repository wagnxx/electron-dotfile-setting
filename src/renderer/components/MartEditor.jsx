import React, { useState } from 'react'
import { useMenuContext } from '../contexts/memuContext'
import './mart-editor.scss';
import { useEffect } from 'react';

export default function MartEditor() {
  const [fileData, setFileData] = useState('');
  const [valueOfKey, setValueOfKey] = useState('');
  const [valueOfDisabled, setValueOfDisabled] = useState(false);
  const [valueOfValue, setValueOfValue] = useState('');
  const [fileIsExist, setFileIsExist] = useState(true);

  const [keyActionOpend, setKeyActionOpend] = useState(false)

  const { currentFile,
    addKeyToContent,
    setContentItemByKey,
    setMenuItemPath
  } = useMenuContext();
  const contents = currentFile.contents || [];

  /**
   * content: 
   * [
   *  {key:'http',value:'http://192.168.1.102:9001',disabled:false }
   * ]
   *  addKeyToContent,removeKeyFromContent
   */
  const addKeyToContentHandle = e => {
    const row = { key: valueOfKey, value: valueOfValue, disabled: valueOfDisabled };
    console.log('insert row : ', row)
    addKeyToContent(row);
    // reset create box value
    setValueOfDisabled(false)
    setValueOfKey('');
    setValueOfValue('');
  }
  const checkboxOfContentChangeHandle = (e, index) => {
    const value = e.target.checked;
    const key = 'disabled'
    setContentItemByKey({ key, value, index })
  }
  const inputOfContentChangeHandle = (e, index) => {
    const value = e.target.value;
    const key = 'value'
    setContentItemByKey({ key, value, index })
  }
  const applyHandle = e => {
    console.log(contents)
    if (contents.length) {
      let str = contents.map(item => {
        let itemStr = `${item.disabled ? '# ' : ''}${item.key}=${item.value}\n`
        return itemStr;
      }).join('')
      // console.log(str)
      writeToTargetFile(str)
    }
  }
  const writeToTargetFile = (data) => {
    const filepath =path.join(homedir, currentFile.path);
    fs.writeFile(filepath, data, () => {
      console.log('write success!!');
      window.location.reload()
    })
  }
  useEffect(() => {
    const filepath =path.join(homedir, currentFile.path);
    fs.access(filepath, 0, (err) => {
      if (err) {
        setFileIsExist(false);
        return;
      }
      setFileIsExist(true);
    })
    console.log('filePath',filepath)
    fs.readFile(filepath, { encoding: 'utf8', flag: 'a+' }, (err, data) => {
      if (err) {
        console.log('read file Error : ', err);
        return;
      }
      console.log('readFile data : ',data.split('\n'))
      setFileData(data);
    })

  },[currentFile.path])
  return (
    <div className="mart-editor">
      <h3>MartEditor</h3>
      <p>
        <span>File Path : </span>
        <span>{homedir}</span>
        <input
          type="text"
          disabled={fileIsExist}
          value={currentFile.path}
          onChange={e => setMenuItemPath(e.target.value)}
        />
      </p>
      <div className="keys-box">
        <table>
          <thead>
            <tr>
              <td>Disabled</td>
              <td>Key Name</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            {
              !contents.length ? ''
                :
                contents.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={item.disabled}
                          onChange={e => checkboxOfContentChangeHandle(e, index)}
                        />
                      </td>
                      <td>
                        <span>{item.key}  </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.value}
                          disabled={item.disabled}
                          onChange={e => inputOfContentChangeHandle(e, index)}
                        />
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>


      <h3>Create Key
        <button onClick={e => setKeyActionOpend(true)}>Add</button>
        <button onClick={e => setKeyActionOpend(false)}>Hide</button>
      </h3>
      {
        !keyActionOpend ? ''
          :
          <div className="keys-action">
            <p>
              <label htmlFor="key-disabled">Disabled :</label>
              <input
                type="checkbox"
                id="key-disabled"
                checked={valueOfDisabled}
                onChange={e => setValueOfDisabled(e.target.checked)} />
            </p>
            <p>
              <label htmlFor="key-value">Key's Value : </label>
              <input
                type="text"
                id="key-value"
                value={valueOfKey}
                onChange={e => setValueOfKey(e.target.value)} />
            </p>
            <p>
              <label htmlFor="value-value">Value's Value : </label>
              <input
                type="text"
                id="value-value"
                value={valueOfValue}
                onChange={e => setValueOfValue(e.target.value)} />
            </p>
            <button onClick={addKeyToContentHandle}>Add To Content</button>
          </div>


      }

      <h3>Native File Preview</h3>
      <div style={{whiteSpace:'pre-wrap',background:"#000",color:'#fff',padding:'10px 4px'}}>
        {fileData}
      </div>

      <div className="keys-apply">
        <button className="clean">Clean</button>
        <button className="apply" onClick={applyHandle}>Apply</button>
      </div>
    </div>
  )
}
