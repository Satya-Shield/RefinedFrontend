FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV NEXT_DISABLE_ESLINT=1

RUN npm run build

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]