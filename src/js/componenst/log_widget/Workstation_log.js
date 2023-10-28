import Log from './Log'

export default class ServerLogger {
  constructor () {
    this.dom = null
    this.logInfo = null
    this.logs = []
    this.create()
  }

  create () {
    const workstationLog = document.createElement('div')
    workstationLog.className = 'workstation__log'

    const title = document.createElement('h2')
    title.className = 'log__title'
    title.innerText = 'Worklog :'

    const logInfo = document.createElement('div')
    logInfo.className = 'log__info'
    this.logInfo = logInfo

    workstationLog.append(title, logInfo)
    this.dom = workstationLog
  }

  add (id, info, time = Date.now()) {
    const log = new Log(id, info, time)
    this.logs.push(log)
    this.logInfo.append(log.dom)
  }
}
