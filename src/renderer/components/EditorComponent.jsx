import React, { useEffect } from 'react';
import { useState } from 'react';
const filePath = '/home/wagnxx/a.txt';
// https-proxy=http://192.168.1.102:10809/
// proxy=http://192.168.1.102:10809/
// # registry=https://registry.npm.taobao.org

export default function EditorComponent() {
  const [fileData, setFileData] = useState('');
  const [httpValue, setHttpValue] = useState('')
  const [httpsValue, setHttpsValue] = useState('');
  const [registryValue, setRegistryValue] = useState('');
  const cleanHandle = e => {

    writeToTargetFile('hello: hello')
  }

  const writeToTargetFile = (data) => {
    fs.writeFile(filePath, data, () => {
      console.log('write success!!');
      window.location.reload()
    })
  }

  const applyHandle = e => {
    console.log(httpValue)
    console.log(httpsValue)

    let str = `
proxy=${httpValue}
https-proxy=${httpsValue}
registry=${registryValue}
    `
    writeToTargetFile(str);
  }


  useEffect(() => {
    console.log(fs)
    // const data = fs.readFileSync(path.join(__dirname,'./ElcHeader.js'));
    // console.log("data",data)
    let data = fs.readFileSync(filePath, { encoding: 'utf8' });
    // data += Date.now() + '\n';
    let a = data.split('\n')
    a = a.map(item => item.replace(/^\s+|\s+$/, ''))
      .filter(item => item !== '')
      .map(item => item.split('='))
      .filter(arr => arr.length === 2)
    console.log('data : ', a);

    initialData(a);

    setFileData(data)

  }, [setFileData])


  const initialData = arrs => {
    if (arrs.length <= 0) return;
    arrs.forEach((arr, index) => {
      let type = arr[0];
      let value = arr[1];
      switch (type) {
        case 'proxy':
          setHttpValue(value);
          break;
        case 'https-proxy':
          setHttpsValue(value);
          break;
        case 'registry':
          setRegistryValue(value);
        default:
          break;
      }
    });
  }

  return (
    <div>
      <h2>EditorComponent</h2>
      <div className="setting-panel">
        <p><label htmlFor="http">http: </label><input value={httpValue} type="text" id="http" onChange={e => setHttpValue(e.target.value)} /></p>
        <p><label htmlFor="https">https: </label><input value={httpsValue} type="text" id="https" onChange={e => setHttpsValue(e.target.value)} /></p>
        <p><label htmlFor="registry">registry: </label><input value={registryValue} type="text" id="registry" onChange={e => setRegistryValue(e.target.value)} /></p>
      </div>
      <button onClick={cleanHandle}>clear</button>
      <button onClick={applyHandle}>Apply</button>
      <h3>文件预览</h3>
      <div style={{ whiteSpace: 'pre-wrap',background:'#000',color:'#fff' }}>
        {fileData}
      </div>
    </div>
  );
}
