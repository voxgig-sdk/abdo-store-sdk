

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


describe('ServiceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ABDO_STORE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ABDO_STORE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AbdoStoreSDK.test()
    const ent = testsdk.Service()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ABDO_STORE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'service.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":false,"sh":"Service category","t":"`$STRING`","key$":"category","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Service description","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Service ID","t":"`$INTEGER`","key$":"id","index$":2},"max":{"a":true,"h":"Max","n":"max","r":false,"sh":"Maximum order quantity","t":"`$INTEGER`","key$":"max","index$":3},"min":{"a":true,"h":"Min","n":"min","r":false,"sh":"Minimum order quantity","t":"`$INTEGER`","key$":"min","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Service name","t":"`$STRING`","key$":"name","index$":5},"price":{"a":true,"fo":"float","h":"Price","n":"price","r":false,"sh":"Service price","t":"`$NUMBER`","key$":"price","index$":6}},"id":{"field":"id","name":"id"},"name":"service","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/services","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/services","q":{},"r":{},"s":[{"lit":"api"},{"lit":"services"}],"t":{"req":"`reqdata`","res":"`body.services`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"service","name__orig":"service","Name":"Service","name_":"service","name-":"service","NAME":"SERVICE","index$":2}, {"active":true,"entity":"service","key$":"BasicServiceFlow","kind":"basic","name":"BasicServiceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"service_ref01"}}],"index$":0}]}, 'Service', {"GET /api/services":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let service_ref01_data = Object.values(setup.data.existing.service)[0] as any

    // LIST
    const service_ref01_ent = client.Service()
    const service_ref01_match: any = {}

    const service_ref01_list = (await service_ref01_ent.list(service_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/service/ServiceTestData.json')

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
    ['service01','service02','service03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ABDO_STORE_TEST_SERVICE_ENTID': idmap,
    'ABDO_STORE_TEST_LIVE': 'FALSE',
    'ABDO_STORE_TEST_EXPLAIN': 'FALSE',
    'ABDO_STORE_APIKEY': '',
  })

  idmap = env['ABDO_STORE_TEST_SERVICE_ENTID']

  const live = 'TRUE' === env.ABDO_STORE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ABDO_STORE_TEST_SERVICE_ENTID']
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
  
