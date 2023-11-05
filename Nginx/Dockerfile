# Define the image you want to build from.
# In this case, we are using the latest version of Nginx.
FROM nginx:latest

# Copy the nginx configuration file to the image.
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports so they can be mapped by Docker daemon.
# Should expose ${NGINX_PORT}
EXPOSE 80

# Define the command to run your app using CMD which defines your runtime.
CMD ["nginx", "-g", "daemon off;"]
