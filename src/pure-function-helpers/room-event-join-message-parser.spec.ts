#!/usr/bin/env ts-node

// tslint:disable:max-line-length
// tslint:disable:no-shadowed-variable

import test  from 'blue-tape'

import {
  PadproMessagePayload,
}                                 from '../schemas'

import {
  roomJoinEventMessageParser,
}                               from './room-event-join-message-parser'

test('roomJoinEventMessageParser() not detected', async t => {
  t.equal(
    await roomJoinEventMessageParser(undefined as any),
    null,
    'should return null for undefined',
  )

  t.equal(
    await roomJoinEventMessageParser('null' as any),
    null,
    'should return null for null',
  )

  t.equal(
    await roomJoinEventMessageParser('test' as any),
    null,
    'should return null for string',
  )

  t.equal(
    await roomJoinEventMessageParser({} as any),
    null,
    'should return null for empty object',
  )

  t.equal(
    await roomJoinEventMessageParser({ content: 'fsdfsfsdfasfas' } as PadproMessagePayload),
    null,
    'should return null for PadproMessagePayload with unknown content',
  )

})

test('roomJoinEventMessageParser() Recall Message', async t => {
  const MESSAGE_PAYLOAD: PadproMessagePayload = {
    content      : 'qq512436430: \n<sysmsg type = "revokemsg"><revokemsg><session>5367653125@chatroom</session><msgid>1452102025</msgid><newmsgid>2582549652250718552</newmsgid><replacemsg><![CDATA["李佳芮" has recalled a message.]]></replacemsg></revokemsg></sysmsg>',
    fromUser     : '5367653125@chatroom',
    messageId    : '8079407148816751084',
    messageSource: '',
    messageType  : 10002,
    status       : 1,
    timestamp    : 1528806181,
    toUser       : 'wxid_5zj4i5htp9ih22',
  }
  t.equal(await roomJoinEventMessageParser(MESSAGE_PAYLOAD), null, 'should return null for a normal message recall payload')
})
