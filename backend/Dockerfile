    FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 3000

CMD ["npm   ", "run", "dev"]
