const Event = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'joinRoom',
  LEAVE_ROOM: 'leaveRoom',
  Question: {
    QUESTION_CHANGE: 'questionChange',
    QUESTION_UPDATE: 'questionUpdate',
  },
  Collaboration: {
    CODE_CHANGE: 'codeChange',
    CODE_UPDATE: 'codeUpdate',
    LANGUAGE_CHANGE: 'languageChange',
    LANGUAGE_UPDATE: 'languageUpdate',
  },
  Communication: {
    CHAT_SEND: 'chatMessage',
    CHAT_RECEIVE: 'message',
  },
};

module.exports = {
  Event,
};
