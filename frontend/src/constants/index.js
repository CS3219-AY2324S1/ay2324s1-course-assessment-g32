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

const SocketEvent = {
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
  Status,
  Complexity,
  Language,
  SocketEvent,
  CollaborationEvent,
  CommunicationEvent,
};
