import  WorkstationController  from './control_widget/Workstation_control'
import  ServerLogger  from './log_widget/Workstation_log'

export default class DomControl {
  constructor () {
    this.control = new WorkstationController()
    this.logger = new ServerLogger()
    this.element = document.querySelector('.workstation')
    this.init()
   
  }

  init () {
    this.element.append(this.control.dom, this.logger.dom)
    this.control.add('145', 'stopped')
    this.control.add('145', 'running')
    this.logger.add('12', 'info', Date.now())
    this.logger.add('145', 'created', Date.now())
    // setTimeout(() => this.control.clear(), 5000)
  }
}
