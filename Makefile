unit-test:
	npm run test:unit --env-file

build:
	docker build -t hemn791/todo-ui-app .
up:
	docker run -d  -p 3001:80 --rm --name vuejs-todo-app-1 hemn791/todo-ui-app
down:
	docker stop vuejs-todo-app-1
bash: 
	docker exec -it vuejs-todo-app-1 sh
