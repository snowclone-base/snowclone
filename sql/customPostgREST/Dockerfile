# Doing this bc postgREST image does not have a shell or other utilities, and
# we need the `curl` command to run the health check.

# derive from any base image you want
FROM alpine:latest

# Install curl
RUN apk --no-cache add curl

# copy PostgREST over
COPY postgrest /bin/postgrest

# Expose the port
EXPOSE 3000

# Set default user
USER 1000

# Set the command to run PostgREST
CMD ["/bin/postgrest"]