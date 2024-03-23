FROM postgres

# Copy the SQL file into the initialization directory
COPY apiSchema.sql /docker-entrypoint-initdb.d/
COPY logins.sql /docker-entrypoint-initdb.d/