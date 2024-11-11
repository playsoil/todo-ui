# build stage
FROM node:lts-alpine AS build-stage
ARG VITE_BASE_URL
WORKDIR /app
COPY package*.json ./
RUN npm install --no-dev
COPY . .
ENV VITE_BASE_URL=$VITE_BASE_URL
RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]