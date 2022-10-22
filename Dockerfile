FROM node:14-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]

FROM base AS build
RUN npm ci --production
COPY . .
RUN npm run build

FROM nginx:1.23.2-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]