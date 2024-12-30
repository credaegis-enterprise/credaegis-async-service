FROM node:22.2-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* /app/
RUN npm install -g pnpm && pnpm install
COPY . /app
EXPOSE 8083
CMD ["pnpm", "start"]