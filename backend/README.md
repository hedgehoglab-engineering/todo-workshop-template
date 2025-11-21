# Backend README

## How do I get started?

Install dependencies / libraries:

```bash
pipenv sync
```

Then run the backend...

## How do I run it?

With live-reload (for development):

```bash
pipenv run uvicorn main:app --reload
```

Without live-reload:

```bash
pipenv run uvicorn main:app
```

## Where is the code?

Start in `main.py`.

## Relevant documentation

 - [Pipenv](https://pipenv.pypa.io/en/latest/)
 - [FastAPI](https://fastapi.tiangolo.com/)
 - [Python](https://docs.python.org/3/)

## I want to use a database!

Start off by storing data in memory - if you've got that working, you could try using SQLite by following and adapting [this tutorial](https://www.geeksforgeeks.org/python/fastapi-sqlite-databases/). You can ignore step 1, all the required libraries are already installed.

If you get SQLite working, you could try using a *proper* database like MySQL or PostgreSQL.
