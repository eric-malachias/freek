import { IControllerStatic } from '../definition'

export class ControllerRegister {
  private static readonly controllers = new Set<IControllerStatic>()

  public static getControllers (): Set<IControllerStatic> {
    return ControllerRegister.controllers
  }

  public static register (controller: IControllerStatic): void {
    ControllerRegister
      .getControllers()
      .add(controller)
  }
}
