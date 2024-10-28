CREATE TABLE movies (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  year INTEGER NOT NULL
);

INSERT INTO cities (name, year)
  VALUES ('Dancing with the wolves', 1994);
INSERT INTO cities (name, year)
  VALUES ('Demolition Man', 1997);
INSERT INTO cities (name, year)
  VALUES ('Casino', 1997);
