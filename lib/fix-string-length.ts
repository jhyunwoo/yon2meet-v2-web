export default function fixStringLength(
  text: string,
  length: number,
  replace?: string,
  startingPoint?: "start" | "end"
) {
  if (text.length > length) {
    return text.slice(0, length + 1)
  } else if (text.length === length) {
    return text
  } else {
    const replacer = replace ? replace : " "
    if (startingPoint === "end") {
      let space = ""
      for (let i = 0; i < length - text.length; i++) {
        space += replacer
      }
      return text + space
    } else {
      let space = ""
      for (let i = 0; i < length - text.length; i++) {
        space += replacer
      }
      return space + text
    }
  }
}
