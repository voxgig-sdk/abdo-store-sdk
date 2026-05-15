
import { Context } from './Context'


class AbdoStoreError extends Error {

  isAbdoStoreError = true

  sdk = 'AbdoStore'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AbdoStoreError
}

