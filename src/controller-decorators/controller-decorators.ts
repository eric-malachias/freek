import { Controller } from '../controller/controller'

export function Prefix (prefix: string) {
  return (target: typeof Controller) => {
    target.prototype.setPrefix(prefix)
  }
}
