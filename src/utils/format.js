const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function formatPrice(price) {
  if (price == null) return 'Price not listed'
  if (price === 0) return 'Free'
  return currency.format(price)
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T/
const dateTime = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' })

// resourceTime is free text ("10am-6pm") or an ISO timestamp; only reformat the latter.
export function isIsoTime(time) {
  return ISO_DATE.test(time ?? '')
}

export function formatTime(time) {
  if (!isIsoTime(time)) return time
  const date = new Date(time)
  return Number.isNaN(date.getTime()) ? time : dateTime.format(date)
}

export function isWebUrl(url) {
  return /^https?:\/\//i.test(url ?? '')
}
