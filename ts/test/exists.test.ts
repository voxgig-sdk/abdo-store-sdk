
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AbdoStoreSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AbdoStoreSDK.test()
    equal(testsdk instanceof AbdoStoreSDK, true,
      'AbdoStoreSDK.test() must return a client synchronously')
  })

})
