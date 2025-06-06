CREATE SCHEMA IF NOT EXISTS "synopticProjectRegistration";

CREATE TABLE IF NOT EXISTS "synopticProjectRegistration".users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "synopticProjectRegistration".water_requests (
  id SERIAL PRIMARY KEY,
  litres DECIMAL NOT NULL,
  urgency VARCHAR(10) NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
