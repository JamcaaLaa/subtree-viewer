import './main.css'
import classes from './main.module.css'
import {
  parseSubtreeFile
} from './parse-subtreefile'

const appDiv = document.querySelector('#app')

const onFileChange = async (inputElement: HTMLInputElement, cb: (subtreeMeta: SubtreeMeta) => void) => {
  const files = inputElement.files
  if (files?.length !== 1) {
    return
  }

  const file = files.item(0)
  if (!file) {
    return
  }

  const buffer = await file.arrayBuffer()
  const subtreeMeta = parseSubtreeFile(buffer)
  cb(subtreeMeta)
}

type SubtreeMeta = {
  headerInfo: {
    magic: string,
    version: number,
    jsonByteLength: number,
    binaryByteLength: number,
  },
  subtreeHeaderJson: any
}

if (appDiv) {
  const inputElement = document.createElement<"input">('input')
  inputElement.type = 'file'
  inputElement.id = 'file-input'
  inputElement.accept = '.subtree'
  inputElement.classList.add(classes.inputEle)

  const infoDiv = document.createElement('div')
  infoDiv.classList.add(classes.info)

  const callback = (subtreeMeta: SubtreeMeta) => {
    infoDiv.innerHTML = /* html */`
    <div class=${classes.headerFields}>
      <div class=${classes.fieldItem}>
        <span class=${classes.fieldName}>magic</span><span class=${classes.fieldValue}>${subtreeMeta.headerInfo.magic}</span>
      </div>
      <div class=${classes.fieldItem}>
        <span class=${classes.fieldName}>version</span><span class=${classes.fieldValue}>${subtreeMeta.headerInfo.version}</span>
      </div>
      <div class=${classes.fieldItem}>
        <span class=${classes.fieldName}>jsonByteLength</span><span class=${classes.fieldValue}>${subtreeMeta.headerInfo.jsonByteLength}</span>
      </div>
      <div class=${classes.fieldItem}>
        <span class=${classes.fieldName}>binaryByteLength</span><span class=${classes.fieldValue}>${subtreeMeta.headerInfo.binaryByteLength}</span>
      </div>
    </div>
    <pre class=${classes.jsonTextArea}>${JSON.stringify(subtreeMeta.subtreeHeaderJson, null, 2)}</pre>
    `
  }

  inputElement.addEventListener('drop', () => {
    onFileChange(inputElement, callback)
  })
  inputElement.addEventListener('change', () => {
    onFileChange(inputElement, callback)
  })
  appDiv.appendChild(inputElement)
  appDiv.appendChild(infoDiv)
}