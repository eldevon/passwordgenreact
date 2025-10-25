# Use PHP 8.2 CLI image (lightweight)
FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    libonig-dev \
    && docker-php-ext-install mbstring

# Set working directory
WORKDIR /var/www/html

# Expose port
EXPOSE 8000

# Start built-in server on container launch
CMD ["php", "-S", "0.0.0.0:8000"]

