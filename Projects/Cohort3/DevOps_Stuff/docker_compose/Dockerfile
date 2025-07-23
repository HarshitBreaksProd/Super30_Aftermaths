FROM node:22-alpine

WORKDIR /app

COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "docker:start"]