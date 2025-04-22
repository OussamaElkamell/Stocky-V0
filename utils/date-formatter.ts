export function formatDate(dateString: string, includeTime = true): string {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }

  if (includeTime) {
    options.hour = "2-digit"
    options.minute = "2-digit"
  }

  return new Intl.DateTimeFormat("fr-FR", options).format(date)
}
