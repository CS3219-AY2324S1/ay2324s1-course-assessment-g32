export const Status = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500,
};

export const Complexity = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

export const Language = {
  PYTHON: 'Python',
  JAVA: 'Java',
  CPP: 'C++',
};

export const SocketEvent = {
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