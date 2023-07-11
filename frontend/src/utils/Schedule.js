export default function Schedule({ id, name, date, color, background }) {
    this.id = id
    this.name = name
    this.date = date
    this.color = color
    this.background = background
}

// https://codechacha.com/ko/javascript-compare-dates/
Schedule.prototype.compareDate = function (date) {
    return this.date.getFullYear() === date.getFullYear()
    && this.date.getMonth() === date.getMonth()
    && this.date.getDate() === date.getDate()
}