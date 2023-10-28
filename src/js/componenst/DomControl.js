import  WorkstationController  from './control_widget/Workstation_control'
import  ServerLogger  from './log_widget/Workstation_log'

export default class DomControl {
  constructor (url) {
    this.control = new WorkstationController()
    this.logger = new ServerLogger()
    this.element = document.querySelector('.workstation')
    this.http = url
    this.sse = new EventSource(this.http + '/sse')
    this.onEventSource()
    this.init()
   
  }

  init () {
    this.element.append(this.control.dom, this.logger.dom)
    this.dataFromServer()
    this.onEventlisteners()

  }

  onEventSource(){
    this.sse.addEventListener('addServer', (event) => {
      const {id , state} = JSON.parse(event.data)
      this.control.add(id, state)
      this.onEventlisteners()
    })

    this.sse.addEventListener('updateServer', (event) => {
        this.updateInstace()
    })

    this.sse.addEventListener('deleteServer', (event) => {
        this.updateInstace()
    })

    this.sse.addEventListener('log', (event) => {

      const {id, changes, date} = JSON.parse(event.data)
      this.logger.add(id, changes, date)
    })
  }

  dataFromServer(){
    fetch(this.http + '/log')
    .then(res => res.json())
    .then(data => data.log.forEach(element => {
      this.logger.add(element.id, element.changes, element.date)      
    }))

    fetch(this.http + '/servers')
    .then(res => res.json())
    .then(data => data.servers.forEach(element => {
      this.control.add(element.id, element.status)
      this.onEventlisteners() 
    }))
  }

  onEventlisteners(){
  
    this.control.dom.removeEventListener('click', this.EventFunction)
    this.control.dom.addEventListener('click', this.EventFunction)
  }

  updateInstace(){
    this.control.clear()
      fetch(this.http + '/servers')
      .then(res => res.json())
      .then(data => {
        data.servers.forEach(element => {
          this.control.add(element.id, element.status)
         })
        this.onEventlisteners()
    })
    
    }
  EventFunction = (event) => {
    if(event.target.classList.contains('task__start')){
      const id = event.target.closest('.task').querySelector('.task__title').textContent;
      fetch(this.http + '/servers/', {
        method: 'PATCH',
        body: JSON.stringify({id, state: 'running'}),
      })
    }
    if(event.target.classList.contains('task__stop')){
      const id = event.target.closest('.task').querySelector('.task__title').textContent;
      fetch(this.http + '/servers/', {
        method: 'PATCH',
        body: JSON.stringify({id, state: 'stopped'}),
      })
    }

    if(event.target.classList.contains('task__del')){
      const id = event.target.closest('.task').querySelector('.task__title').textContent;
      fetch(this.http + '/servers/' + id, {method: 'DELETE'})
    }

    if(event.target.classList.contains('control__add')){
      fetch(this.http + '/servers/', {method: 'POST'})
    }
  }
}


