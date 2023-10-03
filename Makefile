# Stop, build and run the dev container in detached mode
compose-run-dev:
	@docker-compose -f ./docker-compose.dev.yml --project-directory ./ -p hazzweather_dev down && \
	docker-compose -f ./docker-compose.dev.yml --project-directory ./ -p hazzweather_dev build --no-cache && \
	docker-compose -f ./docker-compose.dev.yml --project-directory ./ -p hazzweather_dev up -d

# Stop the dev container
compose-stop-dev:
	@docker-compose -f ./docker-compose.dev.yml --project-directory ./ -p hazzweather_dev down

# Stop the dev container, and remove the volumes (if any) and any orphan existant
compose-rm-dev:
	@docker-compose -f ./docker-compose.dev.yml --project-directory ./ -p hazzweather_dev down -v --remove-orphans

# Stop, build and run the dev container in detached mode
compose-run-prod:
	@docker-compose -f ./docker-compose.prod.yml --project-directory ./ -p hazzweather_prod down && \
	docker-compose -f ./docker-compose.prod.yml --project-directory ./ -p hazzweather_prod build --no-cache && \
	docker-compose -f ./docker-compose.prod.yml --project-directory ./ -p hazzweather_prod up -d

# Stop the prod container
compose-stop-prod:
	@docker-compose -f ./docker-compose.prod.yml --project-directory ./ -p hazzweather_prod down

# Stop the prod container, and remove the volumes (if any) and any orphan existant
compose-rm-prod:
	@docker-compose -f ./docker-compose.prod.yml --project-directory ./ -p hazzweather_prod down -v --remove-orphans

# Build docker image for production
docker-build-prod:
	@docker build -f Dockerfile.prod --target production -t hazzweather . --no-cache

# Run docker container based on production image
docker-run-prod:
	@docker run --env-file .env -d -p 80:80 --name hazzweather_prod hazzweather

# Stop production container
docker-stop-prod:
	@docker stop hazzweather_prod

# Stop and remove production container
docker-rm-prod:
	@docker stop hazzweather_prod && \
	docker rm hazzweather_prod