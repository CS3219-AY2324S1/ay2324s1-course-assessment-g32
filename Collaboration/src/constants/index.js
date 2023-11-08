const Event = {
  Socket: {
    CONNECT: 'connection',
    DISCONNECT: 'disconnect',
    JOIN_ROOM: 'join-room',
    LEAVE_ROOM: 'leave-room',
  },
  Question: {
    CHANGE: 'question-change',
    UPDATE: 'question-update',
  },
  Code: {
    CHANGE: 'code-change',
    UPDATE: 'code-update',
  },
  Language: {
    CHANGE: 'language-change',
    UPDATE: 'language-update',
  },
  Result: {
    CHANGE: 'result-change',
    UPDATE: 'result-update',
  },
  Button: {
    DISABLE_EXEC: 'disable-exec-button',
    UPDATE_EXEC: 'update-exec-button',
  },
  Mouse: {
    POSITION: 'mouse-position',
    LEAVE: 'mouse-leave',
  },
  Communication: {
    CHAT_SEND: 'chat-send',
    CHAT_RECEIVE: 'chat-receive',
  },
};

module.exports = {
  Event,
};
