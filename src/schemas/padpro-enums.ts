export enum ContactType {
  Unknown  = 0,
  Personal = 99990,
  Official = 99991
}

export enum FriendshipType {
  Unknown = 0,
  Confirm = 99990,
  Receive = 99991,
  Verify  = 99992
}

export enum CheckQRCodeStatus {
  Ignore      = -2,
  Unknown     = -1,
  WaitScan    = 0,
  WaitConfirm = 1,
  Confirmed   = 2,
  Timeout     = 3,
  Cancel      = 4,
}

export enum RoomAddTypeStatus {
  Done          = 0,
  NeedInvite    = -2012,
  InviteConfirm = -2028,
}

/**
 * Raw type info:
 * see more inhttps://ymiao.oss-cn-shanghai.aliyuncs.com/apifile.txt
 * 2  - 通过搜索邮箱
 * 3  - 通过微信号搜索
 * 5  - 通过朋友验证消息
 * 7  - 通过朋友验证消息(可回复)
 * 12 - 通过QQ好友添加
 * 14 - 通过群来源
 * 15 - 通过搜索手机号
 * 16 - 通过朋友验证消息
 * 17 - 通过名片分享
 * 22 - 通过摇一摇打招呼方式
 * 25 - 通过漂流瓶
 * 30 - 通过二维码方式
 */
export enum SearchContactTypeStatus {
  Searchable     = 0,
  UnSearchable   = -24,
  EMAIL          = 2,    // search by email
  WXID           = 3,    // search by wxid
  VERIFY_NOREPLY = 5,    // search by friend verify without reply(朋友验证消息)
  VERIFY_REPLY   = 7,    // search by friend verify(朋友验证消息，可回复)
  QQ             = 12,   // search by qq friend
  ROOM           = 14,   // search by room
  MOBILE         = 15,   // search by mobile number
  VERIFY         = 16,   // search friend verify
  CONTACT        = 17,   // search by contact card
  SHAKE          = 22,   // search by shake and shack
  FLOAT          = 25,   // search by float bottle
  QRCODE         = 30,   // search by scanning qrcode
}

export enum PadproMessageStatus {
  One = 1,
}

export enum PadproStatus {
  One  = 1,
}

export enum PadproContinue {
  Done = 0,   // Load Ready
  Go   = 1,   // NOT Load Ready
}

export enum PadproPayloadType {
  Logout             = -1, // -1 when logout
  InvalidPadproToken = -1111, // -1111 when the token pass to Padpro server is invalid
  OnlinePadproToken  = -1112, // -1112 when the token has already logged in to wechaty
  ExpirePadproToken  = -1113, // -1113 when the token is expired
}

export enum WechatAppMessageType {
  Text                  = 1,
  Img                   = 2,
  Audio                 = 3,
  Video                 = 4,
  Url                   = 5,
  Attach                = 6,
  Open                  = 7,
  Emoji                 = 8,
  VoiceRemind           = 9,
  ScanGood              = 10,
  Good                  = 13,
  Emotion               = 15,
  CardTicket            = 16,
  RealtimeShareLocation = 17,
  ChatHistory           = 19,
  MiniProgram           = 33,
  MiniProgramApp        = 36,  // this is forwardable mini program
  Transfers             = 2000,
  RedEnvelopes          = 2001,
  ReaderType            = 100001,
}

export enum PadproEmojiType {
  Unknown = 0,
  Static  = 1,    // emoji that does not have animation
  Dynamic = 2,    // emoji with animation
}

/**
 * Enum for MsgType values.
 * @enum {number}
 * @property {number} TEXT                - MsgType.TEXT                (1)     for TEXT
 * @property {number} IMAGE               - MsgType.IMAGE               (3)     for IMAGE
 * @property {number} VOICE               - MsgType.VOICE               (34)    for VOICE
 * @property {number} VERIFYMSG           - MsgType.VERIFYMSG           (37)    for VERIFYMSG
 * @property {number} POSSIBLEFRIEND_MSG  - MsgType.POSSIBLEFRIEND_MSG  (40)    for POSSIBLEFRIEND_MSG
 * @property {number} SHARECARD           - MsgType.SHARECARD           (42)    for SHARECARD
 * @property {number} VIDEO               - MsgType.VIDEO               (43)    for VIDEO
 * @property {number} EMOTICON            - MsgType.EMOTICON            (47)    for EMOTICON
 * @property {number} LOCATION            - MsgType.LOCATION            (48)    for LOCATION
 * @property {number} APP                 - MsgType.APP                 (49)    for APP         | File, Media Link
 * @property {number} VOIPMSG             - MsgType.VOIPMSG             (50)    for VOIPMSG
 * @property {number} STATUSNOTIFY        - MsgType.STATUSNOTIFY        (51)    for STATUSNOTIFY
 * @property {number} VOIPNOTIFY          - MsgType.VOIPNOTIFY          (52)    for VOIPNOTIFY
 * @property {number} VOIPINVITE          - MsgType.VOIPINVITE          (53)    for VOIPINVITE
 * @property {number} MICROVIDEO          - MsgType.MICROVIDEO          (62)    for MICROVIDEO
 * @property {number} SYSNOTICE           - MsgType.SYSNOTICE           (9999)  for SYSNOTICE
 * @property {number} SYS                 - MsgType.SYS                 (10000) for SYS         | Change Room Topic, Invite into Room, Kick Off from the room
 * @property {number} RECALLED            - MsgType.RECALLED            (10002) for RECALLED
 */
export enum PadproMessageType {
  Text              = 1,
  Contact           = 2,
  Image             = 3,
  Deleted           = 4,
  Voice             = 34,
  SelfAvatar        = 35,
  VerifyMsg         = 37,
  PossibleFriendMsg = 40,
  ShareCard         = 42,
  Video             = 43,
  Emoticon          = 47,
  Location          = 48,
  App               = 49,
  VoipMsg           = 50,
  StatusNotify      = 51,
  VoipNotify        = 52,
  VoipInvite        = 53,
  MicroVideo        = 62,
  SelfInfo          = 101,
  SysNotice         = 9999,
  Sys               = 10000,
  Recalled          = 10002,
  N11_2048          = 2048,  // 2048 = 1 << 11
  N15_32768         = 32768, // 32768  = 1 << 15
}

// TODO: figure out the meaning of the enum values
export enum PadproRoomMemberFlag {
  Zero  = 0,
  One   = 1,
  Eight = 8,
}

export enum ContactOperationCmdId {
  Delete    = 7,
  Operation =  2,
}

export enum ContactOperationBitVal {
  SaveToContact     = 2051,
  RemoveFromContact = 2,
  Star              = 71,
  UnStar            = 7,
  Remark            = 7,
  BlackList         = 15,
  UnBlackList       = 7,
}

export enum GrpcVoiceFormat {
  Amr  = 1,
  Mp3  = 2,
  Wave = 3,
  Silk = 4,
}

export enum GrpcA8KeyScene {
  ContactOrRoom  = 2,
  HistoryReading = 3,
  QRCodeLink     = 4,
  OAAccount      = 7,
}

export enum AutoLoginError {
  CALL_FAILED = 'CALL_FAILED',
  LOGIN_ERROR = 'LOGIN_ERROR',
}

export enum EncryptionServiceError {
  NO_SESSION = 'NO_SESSION',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export enum GrpcSelfAvatarType {
  CURRENT = 1,
  OLD     = 2,
}

export enum CDNFileType {
  IMAGE = 1,
  VIDEO_THUMBNAIL = 3,
  VIDEO = 4,
  ATTACHMENT = 5,
}

export enum CDNFileMd5Exist {
  NON_EXIST = 0,
  EXIST = 1,
}

export enum PadproErrorType {
  LOGIN = 'LOGIN',
}

export enum PadproAutoLoginErrorType {
  SELF_LOGOUT = 'SELF_LOGOUT',
  TOO_FREQUENT = 'TOO_FREQUENT',
  LOGIN_ANOTHER_DEVICE = 'LOGIN_ANOTHER_DEVICE',
  LOGIN_ANOTHER_DEVICE_WITH_WARN = 'LOGIN_ANOTHER_DEVICE_WITH_WARN',
  SAFETY_LOGOUT = 'SAFETY_LOGOUT',
  UNKNOWN = 'UNKNOWN',
}
