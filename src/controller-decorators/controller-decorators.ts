import { Controller } from '../controller'

export function Prefix (prefix: string) {
  return (target: typeof Controller) => {
    console.log(!!target && !!prefix)
    // target.prototype.setPrefix(prefix)
  }
}
