const Event = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  Question: {
    QUESTION_CHANGE: 'question-change',
    QUESTION_UPDATE: 'question-update',
  },
  Collaboration: {
    CODE_CHANGE: 'codeChange',
    CODE_UPDATE: 'codeUpdate',
    LANGUAGE_CHANGE: 'languageChange',
    LANGUAGE_UPDATE: 'languageUpdate',
    RESULT_CHANGE: 'resultChange',
    RESULT_UPDATE: 'resultUpdate',
  },
  Communication: {
    CHAT_SEND: 'chat-send',
    CHAT_RECEIVE: 'chat-receive',
  },
};

module.exports = {
  Event,
};
