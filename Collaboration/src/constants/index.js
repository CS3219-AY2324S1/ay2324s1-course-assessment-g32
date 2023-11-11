const Language = {
  PYTHON: 'Python',
  JAVA: 'Java',
  JS: 'Javascript',
};

const Boilerplate = {
  PYTHON: `def main():
  # Write your code here

if __name__ == "__main__":
  main()
`,
  JAVA: `public class Main {
  public static void main(String[] args) {
    // Write your code here

  }

  // You may implement your methods here

}
`,
  JS: `function main() {
  // Write your code here

}

main();
`,
};

const Event = {
  Socket: {
    CONNECT: 'connection',
    DISCONNECT: 'disconnect',
    JOIN_ROOM: 'join-room',
    LEAVE_ROOM: 'leave-room',
    TERMINATE_ROOM: 'terminate-room',
  },
  Question: {
    CHANGE: 'question-change',
    UPDATE: 'question-update',
  },
  Code: {
    CHANGE: 'code-change',
    UPDATE: 'code-update',
    RESET: 'code-reset',
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
    SYNCHRONIZE: 'synchronize',
  },
};

const MAX_CONNECTION_ATTEMPTS = 20;
const CONNECTION_INTERVAL = 5000; // 5 seconds

module.exports = {
  Language,
  Boilerplate,
  Event,
  MAX_CONNECTION_ATTEMPTS,
  CONNECTION_INTERVAL,
};
