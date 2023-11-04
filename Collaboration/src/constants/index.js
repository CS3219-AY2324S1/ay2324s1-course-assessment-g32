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
    CODE_CHANGE: 'code-change',
    CODE_UPDATE: 'code-update',
    LANGUAGE_CHANGE: 'language-change',
    LANGUAGE_UPDATE: 'language-update',
    MOUSE_POSITION: 'mouse-position',
    MOUSE_LEAVE: 'mouse-leave',
    RESULT_CHANGE: 'result-change',
    RESULT_UPDATE: 'result-update',
  },
  Communication: {
    CHAT_SEND: 'chat-send',
    CHAT_RECEIVE: 'chat-receive',
  },
};

module.exports = {
  Event,
};
