# Étape de build
FROM node:alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm run build

# Étape de production avec Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
