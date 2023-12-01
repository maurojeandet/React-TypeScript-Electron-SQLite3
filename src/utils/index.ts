export const toLocalDate = (date: Date) => {
    let [year, month, day] = date.toISOString().split('T')[0].split('-')
    if (month.length === 1) {
        month = '0' + month
    }
    if (day.length === 1) {
        day = '0' + day
    }
    return `${day}/${month}/${year}`
}

export const toUTCDate = (date: string) => {
    let [day, month, year] = date.split('/')
    if (month.length === 1) {
        month = '0' + month
    }
    if (day.length === 1) {
        day = '0' + day
    }
    return `${year}-${month}-${day}`
}

export const getWeekDates = () => {
    let now = new Date()
    let dayOfWeek = now.getDay() //0-6
    let numDay = now.getDate()

    let start = new Date(now) //copy
    start.setDate(numDay - dayOfWeek)
    start.setHours(0, 0, 0, 0)

    let end = new Date(now) //copy
    end.setDate(numDay + (7 - dayOfWeek))
    end.setHours(0, 0, 0, 0)

    return [start, end]
}