# Stop, build and run the container in detached mode
run-dev:
	@docker-compose -f ./docker-compose.yml --project-directory ./ -p hazzweather_dev down && \
	docker-compose -f ./docker-compose.yml --project-directory ./ -p hazzweather_dev build --no-cache && \
	docker-compose -f ./docker-compose.yml --project-directory ./ -p hazzweather_dev up -d

# Stop the container
stop-dev:
	@docker-compose -f ./docker-compose.yml --project-directory ./ -p hazzweather_dev down

# Stop the container, and remove the volumes (if any) and any orphan existant
rm-dev:
	@docker-compose -f ./docker-compose.yml --project-directory ./ -p hazzweather_dev down -v --remove-orphans

# Build docker image for production
build-prod:
	@docker build --target production -t hazzweather . --no-cache

# Run docker container based on production image
run-prod:
	@docker run -d -p 80:80 --env-file .env --name hazzweather_prod hazzweather

# Stop production container
stop-prod:
	@docker stop hazzweather_prod

# Remove production container
rm-prod:
	@docker rm hazzweather_prod