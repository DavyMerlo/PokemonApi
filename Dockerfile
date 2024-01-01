FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV DATABASE_URL="postgresql://postgres:merlo@postgres:5432/pokemon?schema=public"
ENV PORT=3000
ENV NODE_ENV=development

CMD ["sh", "-c", "npm run migrate:up && npm run seed:db && npm start"]