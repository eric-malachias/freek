import { ControllerRegister } from '../controller-register'
import { ControllerOptions, Metadata } from '../metadata'
import { IControllerStatic } from '../definition'

export function Controller (options: ControllerOptions = {}) {
  return (controller: IControllerStatic) => {
    ControllerRegister.register(controller)

    Metadata.setForController(controller, options)
  }
}
