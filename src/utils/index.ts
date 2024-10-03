export function utf8ToHex(str: string) {
  // 使用encodeURIComponent转换UTF-8字符串为百分号编码字符串
  const encoded = encodeURIComponent(str)

  // 初始化十六进制字符串
  let hex = ''

  // 对于百分号编码字符串中的每个字符
  for (let i = 0; i < encoded.length; i++) {
    // 如果字符是百分号，处理编码的字节
    if (encoded[i] === '%') {
      // 提取两个十六进制数字（跳过百分号）
      const byte = encoded.substring(i + 1, i + 3)
      // 将十六进制数字追加到十六进制字符串
      hex += byte
      // 跳过已处理的两个十六进制数字
      i += 2
    } else {
      // 对于非编码字符，直接获取字符的十六进制编码
      const byte = encoded.charCodeAt(i).toString(16)
      hex += byte
    }
  }

  return hex
}

export const stringToBase64 = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)))
}

export const formatAddress = (str?: string): string => {
  if (str == null) return ''
  if (str.length <= 10) {
    return str
  }
  const firstTwelve = str.slice(0, 4)
  const lastTwelve = str.slice(-6)
  return `${firstTwelve}...${lastTwelve}`
}
