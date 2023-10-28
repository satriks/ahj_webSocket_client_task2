export default class ServerControl {
  constructor (id, status = 'stopped') {
    this.dom = null
    this.create(id, status)
  }

  create (id, status) {
    const task = document.createElement('div')
    task.className = 'task'

    const taskTitle = document.createElement('span')
    taskTitle.className = 'task__title'
    taskTitle.innerText = id

    const taskStatus = document.createElement('div')
    taskStatus.className = 'task__status'

    const statusName = document.createElement('span')
    statusName.innerText = 'Status :'

    const statusDraw = document.createElement('span')
    statusDraw.className = 'status'
    statusDraw.textContent = status

    taskStatus.append(statusName, statusDraw)

    const taskControl = document.createElement('div')
    taskControl.className = 'task__control'

    const taskControlName = document.createElement('span')
    taskControlName.innerText = 'Actions :'

    if (status.trim().toLowerCase() !== 'running') {
      statusDraw.classList.add('status-stop')
      const taskStart = document.createElement('button')
      taskStart.className = 'task__start'
      taskStart.innerText = '\u25B6'
      taskControl.append(taskControlName, taskStart)
    } else {
      statusDraw.classList.add('status-start')
      const taskStop = document.createElement('button')
      taskStop.className = 'task__stop'
      taskStop.innerText = '\u23F8'
      taskControl.append(taskControlName, taskStop)
    }

    const taskDelete = document.createElement('button')
    taskDelete.className = 'task__del'
    taskDelete.innerText = '\u2716'
    taskControl.appendChild(taskDelete)

    task.append(taskTitle, taskStatus, taskControl)
    this.dom = task
  }
}
