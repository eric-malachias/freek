export class ControllerRegister {
  private static readonly controllers = new Set<any>()

  public static getControllers (): Set<any> {
    return ControllerRegister.controllers
  }

  public static register (controller: typeof Function): void {
    ControllerRegister.controllers.add(controller)
  }
}
