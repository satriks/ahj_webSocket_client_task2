import ServerControl from './ServerControl'

export default class WorkstationController {
  constructor () {
    this.dom = null
    this.controlTasks = null
    this.servers = []
    this.create()
  }

  create () {
    const workstationControl = document.createElement('div')
    workstationControl.className = 'workstation__control'

    const title = document.createElement('h2')
    title.className = 'control__title'
    title.innerText = 'You micro instances:'

    const controlTasks = document.createElement('div')
    controlTasks.className = 'control__tasks'
    this.controlTasks = controlTasks

    const controlAdd = document.createElement('span')
    controlAdd.className = 'control__add'
    controlAdd.innerText = 'Create new instance'

    workstationControl.append(title, controlTasks, controlAdd)
    this.dom = workstationControl
  }

  add (id, status = 'stopped') {
    const server = new ServerControl(id, status)
    this.servers.push(server)
    this.controlTasks.appendChild(server.dom)
  }

  clear () {
    this.servers.forEach(server => server.dom.remove())
    this.servers = []
  }
}
