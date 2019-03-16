import {
  MessagePayload,
  MessageType,
}                         from 'wechaty-puppet'

import { appMessageParser } from '.'

import {
  PadproMessagePayload,
  WechatAppMessageType,
}                         from '../schemas'

import {
  isContactId,
  isRoomId,
}                         from './is-type'
import {
  messageFileName,
}                         from './message-file-name'
import {
  messageSourceParser
}                         from './message-source-parser'
import {
  messageType,
}                         from './message-type'

import {
  log,
}                         from '../config'

const PRE = 'messageRawPayloadParser'

export async function messageRawPayloadParser (
  rawPayload: PadproMessagePayload,
): Promise<MessagePayload> {

  // console.log('messageRawPayloadParser:', rawPayload)

  /**
   * 0. Set Message Type
   */
  const type = messageType(rawPayload.messageType)
  log.silly(PRE, `messageType ${type}`)

  const payloadBase = {
    id        : rawPayload.messageId,
    timestamp : rawPayload.timestamp,   // Padchat message timestamp is seconds
    type,
  } as {
    id        : string,
    timestamp : number,
    type      : MessageType,
    filename? : string,
  }

  if (   type === MessageType.Image
      || type === MessageType.Audio
      || type === MessageType.Video
      || type === MessageType.Attachment
  ) {
    payloadBase.filename = messageFileName(rawPayload) || undefined
  }

  let fromId: undefined | string
  let roomId: undefined | string
  let toId:   undefined | string

  let text:   undefined | string

  let mentionIdList: undefined | string[]

  /**
   * 1. Set Room Id
   */
  if (isRoomId(rawPayload.fromUser)) {
    roomId = rawPayload.fromUser
  } else if (isRoomId(rawPayload.toUser)) {
    roomId = rawPayload.toUser
  } else {
    roomId = undefined
  }

  /**
   * 2. Set To Contact Id
   */
  if (isContactId(rawPayload.toUser)) {

    toId = rawPayload.toUser

  } else {
    // TODO: if the message @someone, the toId should set to the mentioned contact id(?)

    toId = undefined

  }

  /**
   * 3. Set From Contact Id
   */
  if (isContactId(rawPayload.fromUser)) {

    fromId = rawPayload.fromUser

  } else {
    const parts = rawPayload.content.split(':\n')
    if (parts && parts.length > 1) {
      if (isContactId(parts[0])) {

        fromId = parts[0]

      }
    } else {

      fromId = undefined

    }
  }

  /**
   *
   * 4. Set Text
   */
  if (isRoomId(rawPayload.fromUser)) {

    const parts = rawPayload.content.split(':\n')
    if (parts && parts.length > 1) {

      text = parts[1]

    } else {

      text = rawPayload.content

    }

  } else {

    text = rawPayload.content

  }

  /**
   * 5.1 Validate Room & From ID
   */
  if (!roomId && !fromId) {
    throw Error('empty roomId and empty fromId!')
  }
  /**
   * 5.1 Validate Room & To ID
   */
  if (!roomId && !toId) {
    throw Error('empty roomId and empty toId!')
  }

  /**
   * 6. Set mention list, only for room messages
   */
  if (roomId) {
    const messageSource = await messageSourceParser(rawPayload.messageSource)
    if (messageSource !== null && messageSource.atUserList) {
      mentionIdList = messageSource.atUserList
    }
  }

  /**
   * 6. Set Contact for ShareCard
   */
  // if (type === MessageType.Contact) {
  //   interface XmlSchema {
  //     msg: {
  //       username: string,
  //       bigheadimgurl: string,
  //       nickname: string,
  //       province: string,
  //       city: string,
  //       sign: string,
  //       sex: number,
  //       antispamticket: string,
  //     },
  //     t: PadchatContactPayload,
  //   }
  //   const jsonPayload = JSON.parse(toJson(text)) as XmlSchema

  //   console.log('jsonPayload:', jsonPayload)
  // }

  let payload: MessagePayload

  // Two branch is the same code.
  // Only for making TypeScript happy
  if (fromId && toId) {
    payload = {
      ...payloadBase,
      fromId,
      mentionIdList,
      roomId,
      text,
      toId,
    }
  } else if (roomId) {
    payload = {
      ...payloadBase,
      fromId,
      mentionIdList,
      roomId,
      text,
      toId,
    }
  } else {
    throw new Error('neither toId nor roomId')
  }

  /**
   * 6. Set app payload type
   */
  if (type === MessageType.Attachment) {
    const appPayload = await appMessageParser(rawPayload)
    if (appPayload) {
      switch (appPayload.type) {
        case WechatAppMessageType.Url:
          payload.type = MessageType.Url
          break
        case WechatAppMessageType.Attach:
          payload.type = MessageType.Attachment
          payload.filename = appPayload.title
          break
        case WechatAppMessageType.ChatHistory:
          payload.type = MessageType.ChatHistory
          break
        case WechatAppMessageType.MiniProgram:
          payload.type = MessageType.MiniProgram
          break
        case WechatAppMessageType.RedEnvelopes:
        case WechatAppMessageType.Transfers:
          payload.type = MessageType.Money
          break
        case WechatAppMessageType.RealtimeShareLocation:
          payload.type = MessageType.Location
          break

        default:
          payload.type = MessageType.Unknown
          break
      }
    }
  }

  return payload
}
