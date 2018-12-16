const moment = require('moment')

const getEndDate = (firstDate, days) => {
  const date = new Date(firstDate)
  return date.setDate(date.getDate() + days)
}

const diffDays = (start_date, coridor) => {
  const oneDay = 1000 * 3600 * 24
  const today = new Date().getTime()
  const secondDate = new Date(
    getEndDate(start_date, coridor)
  )
  const timeDiff = Math.abs(
    secondDate.getTime() - today
  )
  return Math.ceil(
    timeDiff / oneDay
  )
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const firstNumber = n => n = Number(n.toString()[0] + 0)
const formatNumber = n => n.toString()[1] ? n : '0' + n

const calculateDays = ({ expire_date, start_date, coridor }) => {
  const end = Date.parse(expire_date)
  const start = Date.parse(start_date)
  const today = Date.now()
  const total = today - end
  const totalDays = start - end
  const diffTotal = new moment.duration(totalDays)
  const diff = new moment.duration(total)
  const days_before = Math.abs(Math.round(diff.asDays()))
  const visaTime = Math.abs(Math.round(diffTotal.asDays()))
  const percent = firstNumber(days_before / visaTime * 100)

  return {
    percent,
    days_before,
    visaTime,
    coridorBefore: diffDays(start_date, Number(coridor))
  }
}

module.exports = {
  formatTime,
  calculateDays
}
