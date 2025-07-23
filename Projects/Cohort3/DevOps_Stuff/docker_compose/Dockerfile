FROM node:22-alpine

WORKDIR /app

COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN npm i -g pnpm
RUN pnpm i

COPY . .

ENV DATABASE_URL=postgresql://harshit:password@localhost:5432/harshit?schema=public

RUN pnpx prisma migrate dev
RUN pnpx prisma generate
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]