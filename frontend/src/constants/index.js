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
    RESULT_CHANGE: 'resultChange',
    RESULT_UPDATE: 'resultUpdate',
  },
  Communication: {
    CHAT_SEND: 'chatMessage',
    CHAT_RECEIVE: 'message',
  },
};

module.exports = {
  Status,
  Complexity,
  Language,
  Event,
};
