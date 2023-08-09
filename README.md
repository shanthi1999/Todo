# TODO Application Backend

## Local Setup Instructions

If you are running the code locally, please follow these steps:

1. Clone the repository.
2. Install NestJS globally by running the following command:

   ```sh
   npm i -g @nestjs/cli

   ```

3. Navigate to the repository and install project dependencies:

   npm install


4. Open PGAdmin locally and create a database named `todo`. You can also create a table named `todo` with the respective columns using the SQL script provided below:

Open the database named `todo` and go to script and run the following command:

```sql
CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


4. Ensure that your environment configuration (env) has the correct database configuration.
create file named .env

DATABASE_HOST='localhost'
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=root
DATABASE_NAME='todo'
DATABASE_SYNCHRONIZE=true
DATABASE_LOGGING=true


5. Run the project using the following command:

   npm run start:dev

6. The project is now running at http://localhost:3000.


```
## API Information

### GET Endpoint: Retrieve Paginated Todos

Retrieve paginated todos from the server.

**Endpoint:** [http://localhost:3000/todos?page=1&pageSize=10](http://localhost:3000/todos?page=1&pageSize=10)

### GET Endpoint: Retrieve Todos with Specific Status

Retrieve todos with a specific status from the server.

**Endpoint:** [http://localhost:3000/todos?filterStatus=true](http://localhost:3000/todos?filterStatus=true)

### GET Endpoint: Retrieve Todos with Sorting

Retrieve todos with sorting based on a specific field.

**Endpoint:** [http://localhost:3000/todos?sortField=created_at&sortOrder=DESC](http://localhost:3000/todos?sortField=created_at&sortOrder=DESC)

### GET Endpoint: Search for Todos

Search for todos based on a search query.

**Endpoint:** [http://localhost:3000/todos?search=sample](http://localhost:3000/todos?search=sample)


### POST Endpoint: Create a New Todo

Create a new todo by sending a POST request.

**Endpoint:** [http://localhost:3000/todos](http://localhost:3000/todos)

**Payload:**
```json
{
    "title": "Review Content",
    "description": "Proofread and refine all text and visual content on the Home Page for accuracy and clarity",
    "completed": false
}
```
### PUT Endpoint: Update a Todo

Update an existing todo by sending a PUT request.

**Endpoint:** [http://localhost:3000/todos?id=22](http://localhost:3000/todos?id=22)

**Payload:**
```json
{
    "title": "Review Content",
    "description": "Proofread and refine all text and visual content on the Home Page for accuracy and clarity",
    "completed": false
}

```
### DELETE Endpoint: Delete a Todo

Delete a todo by sending a DELETE request.

**Endpoint:** [http://localhost:3000/todos?id=22](http://localhost:3000/todos?id=22)


