CREATE SCHEMA IF NOT EXISTS "synopticProjectRegistration";

CREATE TABLE IF NOT EXISTS "synopticProjectRegistration".users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
