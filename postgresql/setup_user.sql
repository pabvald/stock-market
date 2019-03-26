DROP DATABASE stockexchange IF EXISTS;
CREATE USER stock_nodejs WITH PASSWORD 'Feynman42';
CREATE DATABASE stockexchange;
GRANT ALL PRIVILEGES ON DATABASE stockexchange TO stock_nodejs;