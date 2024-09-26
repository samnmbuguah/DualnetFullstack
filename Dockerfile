# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /app

# Copy the frontend and backend directories to the Docker image
COPY Frontend ./Frontend
COPY Backend ./Backend

# Install the frontend dependencies and build the frontend
WORKDIR /app/Frontend
COPY Frontend/package*.json ./
RUN npm install
RUN npm run build

# Install the backend dependencies
WORKDIR /app/Backend
COPY Backend/package*.json ./
RUN npm install

# Go back to the /app directory
WORKDIR /app

# Copy the start script into the Docker image
COPY package*.json ./
COPY start.sh ./start.sh
RUN chmod +x ./start.sh


# Install the root dependencies
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 80

# Run the start script when the container launches
CMD [ "./start.sh" ]
