# Todo List RESTful API
This is the REST API to organize all your tasks and their status whether it is pending, ongoing or completed. Uses MongoDB database to store the data. Deploy it locally inside containers. The Authentication is implemented using Json Web Token (JWT).

## Deploy
### Inside the container.

1. Clone the repository.
```
git clone https://github.com/yash-saini275/todo_list_api
```

2. Go to the root of repository.
```
cd todo_list_api
```

3. Use **docker-compose** command to build and run the container
    * Build the image
    ```
    docker-compose build
    ```

    * Run the image
    ```
    docker-compose up
    ```

This will start the API and MongoDB server inside the container. Use **Postman** to send requests to the API endpoints.

### API endpoints:
| Endpoint   | Method allowed     | Required Parameters | Description         |
|:----------:|:------------------:|:-------------------:|:-------------------:|
| /signup    | POST               | first_name, last_name, username, password | Create a new user. |
| /signin    | POST               | username, password  | Login the user if account is already created. Generate a new JWT.|
| /signout   | GET                | **None**            | Logout the user. Remove the JWT.|
| /tasks(\*)  | GET                | **None**            | Get all the tasks of current user. |
|            | POST               | name                | Create a new task in logged in users account. |
| /tasks/:taskId(\*) | GET            | **None**            | Get the particular task with id = taskId. |
|            | PUT                | name                | Update the task. |
|            | DELETE             | **None**            | Delete the task with id = taskId. |

* \* These endpoints should contain JWT token to get the response.


