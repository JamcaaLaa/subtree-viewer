const getStringFromArrayBuffer = (buffer: ArrayBuffer, start: number = 0, length: number = -1) => {
  if (length === -1) {
    length = buffer.byteLength
  }
  const strArr: string[] = []
  const slice = buffer.slice(start, start + length)
  const u32Arr = new Uint8Array(slice)
  const u32Length = u32Arr.length
  for (let i = 0; i < u32Length; i++) {
    strArr.push(String.fromCharCode(u32Arr[i]))
  }
  return strArr.join('')
}

const getUint64 = (dv: DataView, byteOffset: number, littleEndian: boolean = true) => {
  const left = dv.getUint32(byteOffset, littleEndian)
  const right = dv.getUint32(byteOffset + 4, littleEndian)
  const combined = littleEndian ? left + 2 ** 32 * right : 2 ** 32 * left + right

  if (!Number.isSafeInteger(combined))
    console.warn(combined, 'exceeds MAX_SAFE_INTEGER. Precision may be lost')

  return combined;
}

export const parseSubtreeFile = (buffer: ArrayBuffer) => {
  const dv = new DataView(buffer)
  const headerInfo = {
    magic: getStringFromArrayBuffer(buffer, 0, 4),
    version: dv.getUint32(4, true), // 默认是使用大端序的，但是数据是使用的小端序
    jsonByteLength: getUint64(dv, 8),
    binaryByteLength: getUint64(dv, 16),
  }

  const jsonStr = getStringFromArrayBuffer(buffer, 24, headerInfo.jsonByteLength)
  const subtreeHeaderJson = JSON.parse(jsonStr)
  return {
    headerInfo,
    subtreeHeaderJson
  }
}