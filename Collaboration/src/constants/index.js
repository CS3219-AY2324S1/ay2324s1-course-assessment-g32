const Event = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'joinRoom',
  LEAVE_ROOM: 'leaveRoom',
  QUESTION_CHANGE: 'questionChange',
  QUESTION_UPDATE: 'questionUpdate',
};

const CollaborationEvent = {
  CODE_CHANGE: 'codeChange',
  CODE_UPDATE: 'codeUpdate',
  LANGUAGE_CHANGE: 'languageChange',
  LANGUAGE_UPDATE: 'languageUpdate',
};

const CommunicationEvent = {
  CHAT_SEND: 'chatMessage',
  CHAT_RECEIVE: 'message',
};

module.exports = {
  Event,
  CollaborationEvent,
  CommunicationEvent,
};
