export default class Log {
  constructor (id, info, time = Date.now()) {
    this.dom = null
    this.create(id, info, time)
  }

  create (id, info, time) {
    const log = document.createElement('div')
    log.className = 'log'
    this.dom = log

    const logTime = document.createElement('span')
    logTime.className = 'log__time'
    logTime.innerText = new Date(time).toLocaleString()

    const logTitle = document.createElement('div')
    logTitle.className = 'log__title'

    const logTitleName = document.createElement('span')
    logTitleName.textContent = 'Server :'

    const logTitleValue = document.createElement('span')
    logTitleValue.className = 'log__title-id'
    logTitleValue.textContent = id

    logTitle.append(logTitleName, logTitleValue)

    const logStatus = document.createElement('div')
    logStatus.className = 'log__status'

    const logStatusName = document.createElement('span')
    logStatusName.textContent = 'INFO :'

    const logStatusValue = document.createElement('span')
    logStatusValue.className = 'log__status-info'
    logStatusValue.textContent = info

    logStatus.append(logStatusName, logStatusValue)
    log.append(logTime, logTitle, logStatus)
  }
}
