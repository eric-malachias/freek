export class ControllerRegister {
  private static readonly controllers = new Set<any>()

  public static getControllers (): Set<any> {
    return ControllerRegister.controllers
  }

  public static register (controller: any): void {
    ControllerRegister
      .getControllers()
      .add(controller)
  }
}
