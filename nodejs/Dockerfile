FROM node:12.6

WORKDIR /opt/StockExchangeBattleRoyale/nodejs

COPY . .

RUN npm install

RUN npm run build

CMD ["node","."]