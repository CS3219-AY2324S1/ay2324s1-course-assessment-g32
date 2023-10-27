# API Endpoints

| Method | API Endpoints                           | Purpose                                                   | Parameters <br> (JSON format)                                         | Require JWT token to be in header? | Does user have to be maintainer? |
| ------ | --------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------- | -------------------------------- |
| GET    | `/auth/authorize`                       | Used to authorize all users                               | -                                                                     | Yes                                | No                               |
| GET    | `/auth/authorizeMaintainer`             | Used to authorize maintainers                             | -                                                                     | Yes                                | Yes                              |
| POST   | `/auth/generate`                        | Used to generate JWT token after user has logged in       | `userId` <br> `isMaintainer`                                          | No                                 | -                                |
| POST   | `/question/create`                      | Used to create new question                               | `title` <br> `complexity` <br> `description` <br> `tags`              | Yes                                | Yes                              |
| DELETE | `/question/delete`                      | Used to delete question                                   | `id`                                                                  | Yes                                | Yes                              |
| POST   | `/question/edit`                        | Used to edit question                                     | `id` <br> `title` <br> `complexity` <br> `description` <br> `tags`    | Yes                                | Yes                              |
| GET    | `/question/getAll`                      | Used to get all the questions from the database           | -                                                                     | Yes                                | No                               |
| GET    | `/question/getAllByComplexity`          | Used to get all the questions of the specified complexity | `complexity`                                                          | Yes                                | No                               |
| GET    | `/question/getQuestionDetails`          | Used to get the details of the specified question         | `id`                                                                  | Yes                                | No                               |
| GET    | `/question/getRandomQuestionByCriteria` | Used to get a random question of the specified criteria   | `complexity`                                                          | Yes                                | No                               |
| POST   | `/user/change-password`                 | Used to change user password                              | `id` <br> `currentPassword` <br> `newPassword` <br> `confirmPassword` | Yes                                | No                               |
| POST   | `/user/delete`                          | Used to delete user                                       | `id`                                                                  | Yes                                | No                               |
| POST   | `/user/login`                           | Used to login                                             | `email` <br> `password`                                               | No                                 | -                                |
| POST   | `/user/read`                            | Used to get user information                              | `id` or `email`                                                       | Yes                                | No                               |
| GET    | `/user/readAll`                         | Used to get all users information                         | -                                                                     | Yes                                | Yes                              |
| POST   | `/user/signup`                          | Used to create new user                                   | `email` <br> `password` <br> `confirmPassword`                        | No                                 | -                                |
| POST   | `/user/update`                          | Used to update user information (username)                | `id` <br> `username`                                                  | Yes                                | No                               |
| POST   | `/queue/join`                           | Used to join the matching queue                           | `queueName` <br> `sessionID`                                          | Yes                                | No                               |
| POST   | `/queue/exit`                           | Used to exit the matching queue                           | `queueName` <br> `sessionID`                                          | Yes                                | No                               |

Remarks:

- `auth` API contains all the authorization related endpoints.
- `question` API contains all the question data related endpoints.
- `user` API contains all the user data related endpoints (including authentication).
- For endpoints requiring JWT token to be in the header, it means the user has to be logged in (authenticated).
- Endpoints can be a probed (eg. via [Postman](https://www.postman.com/downloads/)) like `http://<API host>:<API port>/<endpoint>`
  - Eg. `http://localhost:4001/user/signup`
- As indicated as `template.env` or `.env` files, the APIs have the following ports
  - `user`: 4001
  - `auth`: 5001
  - `question`: 6001
  - `match`: 7001
  - `collab`: 8001

---
[Go to README](../README.md)
