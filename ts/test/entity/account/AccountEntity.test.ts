

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AbdoStoreSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AccountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ABDO_STORE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ABDO_STORE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AbdoStoreSDK.test()
    const ent = testsdk.Account()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ABDO_STORE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'account.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"balance":{"a":true,"fo":"float","h":"Balance","n":"balance","r":false,"sh":"Current account balance","t":"`$NUMBER`","key$":"balance","index$":0},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"Currency code","t":"`$STRING`","key$":"currency","index$":1},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":2}},"name":"account","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/balance","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/balance","q":{},"r":{},"s":[{"lit":"api"},{"lit":"balance"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"account","name__orig":"account","Name":"Account","name_":"account","name-":"account","NAME":"ACCOUNT","index$":0}, {"active":true,"entity":"account","key$":"BasicAccountFlow","kind":"basic","name":"BasicAccountFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"account_ref01","srcdatavar":"account_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-account_ref01"}}],"index$":0}]}, 'Account', {"GET /api/balance":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let account_ref01_data = Object.values(setup.data.existing.account)[0] as any

    // LOAD
    const account_ref01_ent = client.Account()
    const account_ref01_match_dt0: any = {}
    const account_ref01_data_dt0 = (await account_ref01_ent.load(account_ref01_match_dt0)).data()
    assert(null != account_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/account/AccountTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AbdoStoreSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['account01','account02','account03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ABDO_STORE_TEST_ACCOUNT_ENTID': idmap,
    'ABDO_STORE_TEST_LIVE': 'FALSE',
    'ABDO_STORE_TEST_EXPLAIN': 'FALSE',
    'ABDO_STORE_APIKEY': '',
  })

  idmap = env['ABDO_STORE_TEST_ACCOUNT_ENTID']

  const live = 'TRUE' === env.ABDO_STORE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ABDO_STORE_TEST_ACCOUNT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AbdoStoreSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.ABDO_STORE_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.ABDO_STORE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
