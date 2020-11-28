start:
	docker-compose up --build

up:
	docker-compose up -d

stop:
	docker-compose stop

state:
	docker-compose ps

restart:
	docker-compose stop
	docker-compose up -d

rebuild:
	docker-compose stop
	docker-compose build --no-cache
	docker-compose up -d

# Remove dangling images
purge:
	sudo docker rmi $(sudo docker images -f "dangling=true" -q)