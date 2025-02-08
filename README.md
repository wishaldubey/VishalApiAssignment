
## Vishal CRON JOB Assignment 🚀

This project implements a Cron Job Management Service using NestJS and MongoDB. It allows users to schedule and manage automated tasks that trigger external endpoints.

## Project Setup 🚀

Get started quickly with these simple steps:

1. **Clone the Repository ⬇️**

   ```bash
   git clone https://github.com/wishaldubey/VishalApiAssignment.git
   ```

   ```bash
   cd VishalApiAssignment
   ```

2. **Install Dependencies 📦**

   ```bash
   npm install
   ```

3. **Configure MongoDB Connection ⚙️**

   *   Create a `.env` file in the root directory of your project (if one doesn't already exist).
   *   Add the following line to your `.env` file, replacing `<your_mongodb_connection_string>` with your actual MongoDB connection string:

        ```
        MONGODB_URI=<your_mongodb_connection_string>
        ```

        *Example:*

        ```
        MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority
        ```

        *Make sure to replace `user`, `password`, `cluster`, and `database` with your actual MongoDB credentials.*

## Running the Application 🏃‍♂️

Choose the mode that suits your development or deployment needs:

**Development Mode (Live Reload) 🛠️**

```bash
npm run start:dev
```

   This command starts the server in development mode, automatically refreshing with every code change. Access the API at `http://localhost:3000` (or the port defined in your `.env` file).

**Production Mode 🏭**

```bash
npm run start:prod
```

   This builds and launches the application optimized for production environments.

## Testing the API (using `curl` youc vam use POSTMAN too) 🧪

Let's verify the functionality of the Cron Job Management Service.

**Deployment Testing (https://vishalapiassignment.onrender.com) ☁️**

The API is deployed on Render (replace `http://localhost:3000` with `https://vishalapiassignment.onrender.com` when testing on Render). Make sure to test in the proper order to see the changes and test the system thoroughly.

### 1. Create a Cron Job (POST /cron-jobs):

```bash
curl -X POST \
  https://vishalapiassignment.onrender.com/cron-jobs \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "test-job-1",
    "linkToTrigger": "https://example.com/api/trigger",
    "apiKey": "YOUR_API_KEY",
    "schedule": "* * * * *"
  }'
```

*   **Success:** Status Code 201 Created. Response body contains the newly created cron job's details (including its `_id`).  Copy the `_id` for later use.
*   **Failure:** Check the status code and error message in the response body.  Common issues include invalid JSON, validation errors, or duplicate names.

### 2. Get All Cron Jobs (GET /cron-jobs):

```bash
curl https://vishalapiassignment.onrender.com/cron-jobs
```

*   **Success:** Status Code 200 OK. Response body contains a JSON array of cron job objects, including the one you just created.
*   **Failure:** Check the status code and error message.

### 3. Get a Cron Job by ID (GET /cron-jobs/{id}):

Replace `{id}` with the actual `_id` of the cron job you want to retrieve.

```bash
curl https://vishalapiassignment.onrender.com/cron-jobs/YOUR_CRON_JOB_ID
```

*   **Success:** Status Code 200 OK. Response body contains the details of the specified cron job.
*   **Failure:**
    *   Status Code 404 Not Found: The cron job with that ID doesn't exist.  Double-check the `_id`.
    *   Other errors: Check the status code and error message.

### 4. Update a Cron Job (PATCH /cron-jobs/{id}):

Replace `{id}` with the actual `_id` of the cron job you want to update.

```bash
curl -X PATCH \
  https://vishalapiassignment.onrender.com/cron-jobs/YOUR_CRON_JOB_ID \
  -H 'Content-Type: application/json' \
  -d '{
    "schedule": "*/2 * * * *"
  }'
```

*   **Success:** Status Code 200 OK. Response body contains the updated cron job details, including the new `schedule`.
*   **Failure:** Check the status code and error message.

### 5. Delete a Cron Job (DELETE /cron-jobs/{id}):

Replace `{id}` with the actual `_id` of the cron job you want to delete.

```bash
curl -X DELETE https://vishalapiassignment.onrender.com/cron-jobs/YOUR_CRON_JOB_ID
```

*   **Success:** Status Code 200 OK.  Response body might be empty or contain a simple success message.
*   **Failure:** Check the status code and error message.

### 6. Create a Webhook (POST /webhooks):

```bash
curl -X POST \
  https://vishalapiassignment.onrender.com/webhooks \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "message": "Test webhook data"
    }
  }'
```

*   **Success:** Status Code 201 Created. Response body contains the new webhook's details (including `_id` and `createdAt`).
*   **Failure:** Check status code and error messages.

### 7. Get All Webhooks (GET /webhooks):

```bash
curl https://vishalapiassignment.onrender.com/webhooks
```

*   **Success:** Status Code 200 OK. Response body contains a JSON array of all webhooks.
*   **Failure:** Check status code and error messages.

**Important Notes:**

*   **YOUR_API_KEY:** Replace `"YOUR_API_KEY"` with the appropriate API key if your `linkToTrigger` endpoint requires one. If it doesn't, you can leave it as a placeholder (but it needs to be present).
*   **YOUR_CRON_JOB_ID:** Replace `"YOUR_CRON_JOB_ID"` with the actual ID of the cron job you're working with.
*   **Newlines and Escaping:** These `curl` commands are formatted for readability. If you have trouble running them directly, you might need to adjust newlines and escape special characters (especially `"`). Using a tool like Postman can simplify the process.
*   **Authentication:** If your API requires authentication (e.g., API keys, JWT tokens), you'll need to add the appropriate headers to your `curl` commands.
*   **Remember** Verify the API's documentation to ensure accurate formatting.

## Additional Commands ⚙️

Explore other functionalities with these commands:

*   **Unit Tests:**

    ```bash
    npm run test
    ```

*   **End-to-End Tests:**

    ```bash
    npm run test:e2e
    ```

*   **Test Coverage:**

    ```bash
    npm run test:cov
    ```
``


