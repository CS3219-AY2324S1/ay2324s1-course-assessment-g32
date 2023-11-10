# API Endpoints

| Method | API Endpoints                | Purpose                                         | Parameters <br> (JSON format)                                         | Header Contains | [Roles](#roles) |
|-------:|------------------------------|-------------------------------------------------|-----------------------------------------------------------------------|-----------------|-----------------|
| GET    | `/auth/authorize`            | Authorize all users                             | -                                                                     | JWT token       | User            |
| GET    | `/auth/authorize-maintainer` | Authorize maintainers                           | -                                                                     | JWT token       | Maintainer      |
| POST   | `/auth/generate`             | Generate JWT token (after user has logged in)   | `userId` <br> `isMaintainer`                                          | -               | Guest           |
| GET    | `/question/`                 | Get the details of specified question           | `id`                                                                  | JWT token       | User            |
| POST   | `/question/`                 | Create new question                             | `title` <br> `complexity` <br> `description` <br> `tags`              | JWT token       | Maintainer      |
| PUT    | `/question/`                 | Edit existing question                          | `id` <br> `title` <br> `complexity` <br> `description` <br> `tags`    | JWT token       | Maintainer      |
| DELETE | `/question/`                 | Delete question                                 | `id`                                                                  | JWT token       | Maintainer      |
| GET    | `/question/all`              | Get all questions                               | -                                                                     | JWT token       | User            |
| GET    | `/question/by-criteria`      | Get all questions fitting criteria              | `complexity` <br> `tags`                                              | JWT token       | User            |
| GET    | `/question/random`           | Get random question fitting criteria            | `complexity`                                                          | JWT token       | User            |
| GET    | `/question/statistics`       | Get number of questions by complexity           | -                                                                     | JWT token       | User            |
| POST   | `/question/append-question-title` | For given array of question IDs, <br> return the questions IDs + title | `attempts` (array)                        | JWT token       | User            |
| POST   | `/question/count-by-difficulty` | For given array of question IDs, <br> count how many questions in each difficulty   | `questionsId` (array)          | JWT token       | User            |
| GET    | `/user/`                     | Get user information                            | `id` or `email`                                                       | JWT token       | User            |
| DELETE | `/user/`                     | Delete user                                     | `id`                                                                  | JWT token       | User            |
| GET    | `/user/all`                  | Get information for all users                   | -                                                                     | JWT token       | Maintainer      |
| POST   | `/user/login`                | Login                                           | `email` <br> `password`                                               | -               | Guest           |
| POST   | `/user/signup`               | create new user                                 | `email` <br> `password` <br> `confirmPassword`                        | -               | Guest           | 
| PUT    | `/user/toggle-user-role`     | Toggle the user's role (user or maintainer)     | `id`
| PUT    | `/user/display-name`         | Update user's display name                      | `id` <br> `username`                                                  | JWT token       | User            |
| PUT    | `/user/change-password`      | Change user's password                          | `id` <br> `currentPassword` <br> `newPassword` <br> `confirmPassword` | JWT token       | User            |
| PUT    | `/user/programming-language` | Update user's preferred programming language    | `id` <br> `programmingLanguage`                                       | JWT token       | User            |
| PUT    | `/user/complexity`           | Update user's preferred question complexity     | `id` <br> `complexity`                                                | JWT token       | User            |
| POST   | `/queue/join`                | Join the matching queue                         | `queueName` <br> `sessionID`                                          | JWT token       | User            |
| POST   | `/queue/exit`                | Exit the matching queue                         | `queueName` <br> `sessionID`                                          | JWT token       | User            |
| GET    | `/history/piechart`          | Get pie chart data for a user                   | `userId` <br> `questionId` <br> `code` <br> `language`                | JWT token       | User            |
| GET    | `/history/heatmap`           | Get heatmap data for a user                     | `userId`                                                              | JWT token       | User            |
| GET    | `/history/attempts`          | Get attempts by user, for all or one question   | `userId` <br> `questionId` (optional)                                 | JWT token       | User            |
| GET    | `/history/attempt`           | Get a single attempt details                    | `attemptId`                                                           | JWT token       | User            |
| POST   | `/history/attempt`           | Add attempt to user history                     | `userId` <br> `questionId` <br> `code` <br> `language`                | JWT token       | User            |
| POST   | `/execute/python`            | Execute the Python code in the code editor      | `codeObject`                                                          | -               | User            |
| POST   | `/execute/java`              | Execute the Java code in the code editor        | `codeObject`                                                          | -               | User            |
| POST   | `/execute/js`                | Execute the JavaScript code in the code editor  | `codeObject`                                                          | -               | User            |

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
