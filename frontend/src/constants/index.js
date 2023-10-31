const Status = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500,
};

const Complexity = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

const Language = {
  PYTHON: 'Python',
  JAVA: 'Java',
  CPP: 'C++',
};

const Event = {
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
  },
  Communication: {
    CHAT_SEND: 'chat-send',
    CHAT_RECEIVE: 'chat-receive',
  },
};

module.exports = {
  Status,
  Complexity,
  Language,
  Event,
};
