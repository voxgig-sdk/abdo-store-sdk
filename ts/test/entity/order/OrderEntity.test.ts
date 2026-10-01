

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


describe('OrderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ABDO_STORE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ABDO_STORE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AbdoStoreSDK.test()
    const ent = testsdk.Order()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ABDO_STORE_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'order.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"charge":{"a":true,"fo":"float","h":"Charge","n":"charge","r":false,"sh":"Order charge","t":"`$NUMBER`","key$":"charge","index$":0},"comments":{"a":true,"h":"Comments","n":"comments","r":false,"sh":"Additional comments or instructions (optional)","t":"`$STRING`","key$":"comments","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"link":{"a":true,"h":"Link","n":"link","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Target link","t":"`$STRING`","key$":"link","index$":3},"order_id":{"a":true,"h":"Order Id","n":"order_id","r":false,"sh":"Order ID","t":"`$INTEGER`","key$":"order_id","index$":4},"quantity":{"a":true,"h":"Quantity","n":"quantity","op":{"create":{"req":true,"type":"`$INTEGER`"}},"r":false,"sh":"Order quantity","t":"`$INTEGER`","key$":"quantity","index$":5},"remains":{"a":true,"h":"Remains","n":"remains","r":false,"sh":"Remaining quantity","t":"`$INTEGER`","key$":"remains","index$":6},"service_id":{"a":true,"h":"Service Id","n":"service_id","op":{"create":{"req":true,"type":"`$INTEGER`"}},"r":false,"sh":"Service ID","t":"`$INTEGER`","key$":"service_id","index$":7},"start_count":{"a":true,"h":"Start Count","n":"start_count","r":false,"sh":"Start count","t":"`$INTEGER`","key$":"start_count","index$":8},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Order status","t":"`$STRING`","key$":"status","index$":9}},"id":{"field":"id","name":"id"},"name":"order","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/order","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/order","q":{},"r":{},"s":[{"lit":"api"},{"lit":"order"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/order/{order_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"order_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/order/{order_id}","q":{"exist":["id"]},"r":{"param":{"order_id":"id"}},"s":[{"lit":"api"},{"lit":"order"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.order`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"order","name__orig":"order","Name":"Order","name_":"order","name-":"order","NAME":"ORDER","index$":1}, {"active":true,"entity":"order","key$":"BasicOrderFlow","kind":"basic","name":"BasicOrderFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"order_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"order_ref01","srcdatavar":"order_ref01_data","suffix":"_dt0"},"m":{"id":"order01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-order_ref01"}}],"index$":1}]}, 'Order', {"POST /api/order":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["service_id","link","quantity"],"properties":{"service_id":{"type":"integer","description":"ID of the service to order","key$":"service_id"},"link":{"type":"string","description":"Link to the social media post or profile","key$":"link"},"quantity":{"type":"integer","description":"Quantity of the service to order","key$":"quantity"},"comments":{"type":"string","description":"Additional comments or instructions (optional)","key$":"comments"}},"index$":1}}}},"parameters":[]},"GET /api/order/{order_id}":{"protocol":"http","parameters":[{"name":"order_id","in":"path","required":true,"description":"The order ID to retrieve","schema":{"type":"integer"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const order_ref01_ent = client.Order()
    let order_ref01_data = setup.data.new.order['order_ref01']

    order_ref01_data = (await order_ref01_ent.create(order_ref01_data)).data()
    assert(null != order_ref01_data.id)


    // LOAD
    const order_ref01_match_dt0: any = {}
    order_ref01_match_dt0.id = order_ref01_data.id
    const order_ref01_data_dt0 = (await order_ref01_ent.load(order_ref01_match_dt0)).data()
    assert(order_ref01_data_dt0.id === order_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/order/OrderTestData.json')

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
    ['order01','order02','order03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ABDO_STORE_TEST_ORDER_ENTID': idmap,
    'ABDO_STORE_TEST_LIVE': 'FALSE',
    'ABDO_STORE_TEST_EXPLAIN': 'FALSE',
    'ABDO_STORE_APIKEY': '',
  })

  idmap = env['ABDO_STORE_TEST_ORDER_ENTID']

  const live = 'TRUE' === env.ABDO_STORE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ABDO_STORE_TEST_ORDER_ENTID']
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
  
