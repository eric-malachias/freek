import { ControllerRegister } from '../controller-register'
import { ControllerOptions, Metadata } from '../metadata'

export function Controller (options: ControllerOptions = {}) {
  return (target: any) => {
    ControllerRegister.register(target)

    Metadata.setForController(target, options)
  }
}
