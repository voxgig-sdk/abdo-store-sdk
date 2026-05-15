
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AbdoStoreSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AbdoStoreSDK.test()
    equal(null !== testsdk, true)
  })

})
