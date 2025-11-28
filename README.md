# todo-workshop-template
Template / starting point for a todo app for a workshop

# How do I run the Docker images?

Please run the backend directly *at least once* before running (see backend/README.md), or create the backend/todos.db file manually.
If you do not do one of these, the backend container will fail to start.

You will need to have the Docker engine running, and Docker CLI installed.
The easiest way to achieve this is to install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
docker compose up -d --build
```

Once the containers are started, you can use the application at [http://localhost:3000](http://localhost:3000).
