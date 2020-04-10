import { expect } from 'chai'
import { ControllerRegister } from './controller-register'

describe('ControllerRegister', () => {
  describe('.getControllers', () => {
    it('returns controllers', () => {
      expect(ControllerRegister.getControllers().size).to.equal(0)
      ControllerRegister.getControllers().add({})
      expect(ControllerRegister.getControllers().size).to.equal(1)
      ControllerRegister.getControllers().add({})
      expect(ControllerRegister.getControllers().size).to.equal(2)
      ControllerRegister.getControllers().clear()
      expect(ControllerRegister.getControllers().size).to.equal(0)
    })
  })

  describe('.register', () => {
    it('adds controller to set', () => {
      const controllerA = {}
      const controllerB = {}

      expect(ControllerRegister.getControllers().size).to.equal(0)
      ControllerRegister.register(controllerA)
      expect(ControllerRegister.getControllers().size).to.equal(1)
      ControllerRegister.register(controllerA)
      expect(ControllerRegister.getControllers().size).to.equal(1)
      ControllerRegister.register(controllerB)
      expect(ControllerRegister.getControllers().size).to.equal(2)
      ControllerRegister.getControllers().clear()
      expect(ControllerRegister.getControllers().size).to.equal(0)
    })
  })
})
