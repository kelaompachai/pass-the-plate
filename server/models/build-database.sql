-- run this script to create the database the app needs locally on a development machine

-- create a user or role
CREATE ROLE passtheplate WITH LOGIN PASSWORD 'cheese';

-- create a database owned by that user
CREATE DATABASE passtheplate OWNER passtheplate;


-- create users table
-- fields include username, password, and zip code
-- username must be unique, so it should be a sufficient primary key

