import dayjs from "dayjs"

const formatDateTime = (date: Date) => {
  return dayjs(date).format('DD/MM/YYYY hh:mm A')
}

export { formatDateTime }