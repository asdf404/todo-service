# TODO service

[Task](https://drive.google.com/open?id=1el24qc950h8BKMEm1IKhQEJYJzB9i0pt).

Create `.env` file in the root of project:

```
JWT_SECRET=secret
NODE_ENV=development
DOMAIN_NAME=localhost

# admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

Change `DOMAIN_NAME` to any you like.

In development mode you need to manual install nodejs deps in `backend` and `frontend` dirs with `npm install`.

You need docker and docker-compose to run this project. Just say `docker-compose up` and it will be started. It needs some time to build frontend.

Now go to [http://localhost/](http://localhost/) and login (via `ADMIN_USERNAME` and `ADMIN_PASSWORD` you set in `.env` file) or register new user. Have fun.

## Development

All backend stuff will placed in `backend` dir. There is no tests or docs because its a test task.

All frontend stuff will placed in `frontend` dir.

## License

WTFPL
