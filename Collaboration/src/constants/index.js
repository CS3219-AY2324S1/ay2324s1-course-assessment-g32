export const Event = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'joinRoom',
  LEAVE_ROOM: 'leaveRoom',
  QUESTION_CHANGE: 'questionChange',
  QUESTION_UPDATE: 'questionUpdate',
};

export const CollaborationEvent = {
  CODE_CHANGE: 'codeChange',
  CODE_UPDATE: 'codeUpdate',
  LANGUAGE_CHANGE: 'languageChange',
  LANGUAGE_UPDATE: 'languageUpdate',
};

export const CommunicationEvent = {
  CHAT_SEND: 'chatMessage',
  CHAT_RECEIVE: 'message',
};
