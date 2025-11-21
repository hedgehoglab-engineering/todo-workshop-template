# Backend README

## TLDR

```bash
pipenv run uvicorn main:app --reload
```

OR

```bash
pipenv run uvicorn main:app
```

`pipenv run uvicorn main:app --reload` includes live-restarts with a dev server, `pipenv run uvicorn main:app` will run a production build.

## Where is the code?

Start in `main.py`.

## Relevant documentation

 - [Pipenv](https://pipenv.pypa.io/en/latest/)
 - [FastAPI](https://fastapi.tiangolo.com/)
 - [Python](https://docs.python.org/3/)

## I want to use a database!

Start off by storing data in memory - if you've got that working, you could try using SQLite by following and adapting [this tutorial](https://www.geeksforgeeks.org/python/fastapi-sqlite-databases/).

If you get SQLite working, you could try using a *proper* database like MySQL or PostgreSQL.
