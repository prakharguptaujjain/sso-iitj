# *Backend*

## Requirements :
- Python 3.8
- Other dependencies in `Pipfile`

## Steps to setup locally :
- If you are in the main directory (sso-iitj) then navigate to the backend directory
    ```
    cd backend
    ```
- Install `pipenv` for dependency management
    ```
    pip install pipenv
    ```
- Use pipenv to install other dependencies from `Pipfile`
    ```
    pipenv install --dev
    ```
- Activate the new virtual environment
    ```
    pipenv shell
    ```
- Copy `.env.example` to `.env`
    ```
    cp .env.example .env
    ```
- Make database migrations
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
- Create a superuser
    ```
    python manage.py createsuperuser
    ```
- Run development server on localhost
    ```
    python manage.py runserver :8000
    ```
#### Dummy Data for Testing [OPTIONAL]:

- This will populate the database with random values for testing:
    ```
    python manage.py createfixture
    ```