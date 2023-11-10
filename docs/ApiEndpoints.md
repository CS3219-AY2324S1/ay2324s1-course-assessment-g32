# API Endpoints

| Method | API Endpoints                | Purpose                                                  | Parameters <br> (JSON format)                                         | Header Contains | [Roles](#roles) |
| ------ | ---------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------- | --------------- | ----------      |
| GET    | `/auth/authorize`            | Used to authorize all users                              | -                                                                     | JWT token       | User            |
| GET    | `/auth/authorize-maintainer` | Used to authorize maintainers                            | -                                                                     | JWT token       | Maintainer      |
| POST   | `/auth/generate`             | Used to generate JWT token after user has logged in      | `userId` <br> `isMaintainer`                                          | -               | Guest           |
| POST   | `/question/create`           | Used to create new question                              | `title` <br> `complexity` <br> `description` <br> `tags`              | JWT token       | Maintainer      |
| DELETE | `/question/delete`           | Used to delete question                                  | `id`                                                                  | JWT token       | Maintainer      |
| PUT    | `/question/edit`             | Used to edit question                                    | `id` <br> `title` <br> `complexity` <br> `description` <br> `tags`    | JWT token       | Maintainer      |
| GET    | `/question/read-all`         | Used to get all the questions from the database          | -                                                                     | JWT token       | User            |
| GET    | `/question/read`             | Used to get the details of the specified question        | `id`                                                                  | JWT token       | User            |
| PUT    | `/user/change-password`      | Used to change user password                             | `id` <br> `currentPassword` <br> `newPassword` <br> `confirmPassword` | JWT token       | User            |
| DELETE | `/user/delete`               | Used to delete user                                      | `id`                                                                  | JWT token       | User            |
| POST   | `/user/login`                | Used to login                                            | `email` <br> `password`                                               | -               | Guest           |
| GET    | `/user/read`                 | Used to get user information                             | `id` or `email`                                                       | JWT token       | User            |
| GET    | `/user/read-all`             | Used to get all users information                        | -                                                                     | JWT token       | Maintainer      |
| POST   | `/user/signup`               | Used to create new user                                  | `email` <br> `password` <br> `confirmPassword`                        | -               | Guest           | 
| PUT    | `/user/display-name`         | Used to update user's display name                       | `id` <br> `username`                                                  | JWT token       | User            |
| PUT    | `/user/programming-language` | Used to update user's preferred programming language     | `id` <br> `programmingLanguage`                                       | JWT token       | User            |
| PUT    | `/user/complexity          ` | Used to update user's preferred question complexity      | `id` <br> `complexity`                                                | JWT token       | User            |
| POST   | `/queue/join`                | Used to join the matching queue                          | `queueName` <br> `sessionID`                                          | JWT token       | User            |
| POST   | `/queue/exit`                | Used to exit the matching queue                          | `queueName` <br> `sessionID`                                          | JWT token       | User            |
| POST   | `/history/attempt`           | Used to add attempt to user history                      | `userId` <br> `questionId` <br> `code` <br> `language`                | JWT token       | User            |
| GET    | `/history/attempts`          | Used to get all attempts submitted by a user             | `userId`                                                              | JWT token       | User            |
| GET    | `/history/attempts`          | Used to get attempts for a question, submitted by a user | `userId` <br> `questionId`                                            | JWT token       | User            |
| GET    | `/history/heatmap`           | Used to get heatmap data for a user                      | `userId`                                                              | JWT token       | User            |
| GET    | `/history/piechart`          | Used to get pie chart data for a user                    | `userId` <br> `questionId` <br> `code` <br> `language`                | JWT token       | User            |
| GET    | `/history/attempt`           | Used to get a single attempt details                     | `attemptId`                                                           | JWT token       | User            |
| GET    | `/history/heatmap`           | Used to get heatmap data for a user                      | `userId`                                                              | JWT token       | User            |
| POST   | `/execute/python`            | Used to execute the Python code in the code editor       | `codeObject`                                                          | -               | User            |
| POST   | `/execute/java`              | Used to execute the Java code in the code editor         | `codeObject`                                                          | -               | User            |
| POST   | `/execute/js`                | Used to execute the JavaScript code in the code editor   | `codeObject`                                                          | -               | User            |

Remarks:

- `auth` API contains all the authorization related endpoints.
- `question` API contains all the question data related endpoints.
- `user` API contains all the user data related endpoints (including authentication).
- `queue` API contains all the matching related events.
- `history` API contains all the history related endpoints.
- `execute` API contains all the execution related endpoints.
- For endpoints requiring JWT token to be in the header, it means the user has to be logged in (authenticated).
- Endpoints can be a probed (eg. via [Postman](https://www.postman.com/downloads/)) like `http://<API host>:<API port>/<endpoint>`
  - Eg. `http://localhost:4001/user/signup`
- As indicated as `template.env` or `.env` files, the APIs have the following ports
  - `user`: 4001
  - `auth`: 5001
  - `question`: 6001
  - `match`: 7001
  - `collab`: 8001
  - `history`: 9001
  - `execution`: 10001

### Roles
- Guest
  - Has no account
  - Has very limited access
- User
  - Has registered with an account
  - Can access all pages by Guest
  - Can also access other more pages (but not all)
- Maintainer
  - Has account with maintainer (admin) privilege
  - Can access all pages by Guest
  - Can also access all pages

---

[Go to README](../README.md)
