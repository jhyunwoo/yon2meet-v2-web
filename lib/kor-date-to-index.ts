export default function korDateToIndex(date: string) {
  if (date === "일") {
    return 0
  } else if (date === "월") {
    return 1
  } else if (date === "화") {
    return 2
  } else if (date === "수") {
    return 3
  } else if (date === "목") {
    return 4
  } else if (date === "금") {
    return 5
  } else if (date === "토") {
    return 6
  } else {
    return 0
  }
}
