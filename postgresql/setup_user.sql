-- Delete database if it already exists
DROP DATABASE IF EXISTS main ;

-- Create user 
CREATE USER stock_nodejs WITH PASSWORD 'Feynman42';

-- Create database
CREATE DATABASE stockexchange;

-- Grant PRIVILEGES 
GRANT ALL PRIVILEGES ON DATABASE stockexchange TO stock_nodejs;
