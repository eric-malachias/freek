import { expect } from 'chai'
import { Controller } from '../controller'
import { ControllerHandlerManager } from './controller-handler-manager'

describe('ControllerHandlerManager', () => {
  beforeEach(() => {
    ControllerHandlerManager.resetHandlers()
  })

  describe('.getHandler', () => {
    it('throws error if method does not exist', () => {
      class TestController extends Controller {
        public correctSpelling (): void {}
      }

      expect(() => ControllerHandlerManager.getHandler(TestController, 'typo')).to.throw()
    })

    it('performs an upsert to handlers list', () => {
      class TestController extends Controller {
        public test (): void {}
        public test2 (): void {}
      }

      expect(ControllerHandlerManager.getHandlers().length).to.equal(0)
      ControllerHandlerManager.getHandler(TestController, 'test')
      expect(ControllerHandlerManager.getHandlers().length).to.equal(1)
      ControllerHandlerManager.getHandler(TestController, 'test')
      expect(ControllerHandlerManager.getHandlers().length).to.equal(1)
      ControllerHandlerManager.getHandler(TestController, 'test2')
      expect(ControllerHandlerManager.getHandlers().length).to.equal(2)
    })
  })

  describe('.getHandlers', () => {
    it('returns handlers', () => {
      class TestController extends Controller {
        public postStuff (): string[] {
          return ['stuff']
        }
      }

      ControllerHandlerManager.getHandler(TestController, 'postStuff')

      const [handler] = ControllerHandlerManager.getHandlers()

      expect(handler.getController()).equal(TestController)
    })
  })

  describe('.resetHandlers', () => {
    it('clears handlers', () => {
      class TestController extends Controller {
        public getTest (): string[] {
          return ['', '1']
        }
      }

      ControllerHandlerManager.getHandler(TestController, 'getTest')

      expect(ControllerHandlerManager.getHandlers()).to.not.deep.equal([])

      ControllerHandlerManager.resetHandlers()

      expect(ControllerHandlerManager.getHandlers()).to.deep.equal([])
    })
  })
})
