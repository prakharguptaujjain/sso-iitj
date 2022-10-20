# SSO-IITJ
SSO for IITJ Communtiy

## Steps to run locally

- Clone this repository and launch code:
    ```
    git clone https://github.com/devlup-labs/sso-iitj.git
    cd sso-iitj
    code .
    ```

<!-- ### With Docker

Ensure that you have installed [Docker](https://docs.docker.com/install/) (with [Docker Compose](https://docs.docker.com/compose/install/)).

Run the development server:
    ```
    make dev-start
    ```

After executing `make dev-start`, you will be running:
* The application on http://localhost:3000 
* The API Server on http://localhost:8000

Make database migrations: 
```
make exec
python manage.py makemigrations
python manage.py migrate
```

Create a superuser: 
```
make exec
python manage.py createsuperuser
```

View logs of docker containers: 
```
make dev-logs
```

To stop the development server: 
```
make dev-stop
```

### Without Docker -->

- To start your frontend and backend development server individually:

    Follow the [Backend Readme](https://github.com/devlup-labs/sso-iitj/blob/main/backend/README.md) to setup your backend server

    <!-- Follow the [Frontend Readme](https://github.com/devlup-labs/sso-iitj/blob/main/frontend/README.md) to setup the frontend server -->