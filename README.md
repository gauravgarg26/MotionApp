# Facebook API Integration Project

This project integrates with the Facebook API to fetch basic user information.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Facebook Developer Account with an app created to obtain an access token.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/gauravgarg26/MotionApp.git
    ```

2. Navigate to the project directory:
    ```sh
    cd MotionApp/
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

### Configuration

Before running the project, configure the Facebook access token using one of the following methods:

1. **Passing Environment Variable from Terminal**:

    ```sh
    FACEBOOK_ACCESS_TOKEN=your_access_token node app.js
    ```

2. **Using a .env file**:

    Create a `.env` file in the root of the project directory and add the following line:
    ```sh
    FACEBOOK_ACCESS_TOKEN=your_access_token
    ```

    Then, run:
    ```sh
    node app.js
    ```

Replace `your_access_token` with your actual Facebook access token obtained from the Facebook Developer Console.

Now you're ready to use the project to fetch basic user information from Facebook!