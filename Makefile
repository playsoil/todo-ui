unit-test:
	npm run test:unit --env-file

build:
	docker build -t playsoil/todo-ui .
up:
	docker run -d  -p 3001:80 --rm --name vuejs-todo-app-1 playsoil/todo-ui
down:
	docker stop vuejs-todo-app-1
bash: 
	docker exec -it vuejs-todo-app-1 sh
