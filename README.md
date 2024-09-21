# Water Management Application Setup Guide

This guide will walk you through the steps to set up and run the Water Management Application. Follow the steps carefully to ensure everything is set up correctly.


## Prerequisites

- Docker
- Docker Compose
- Python 3.x
- Yarn
- Git

## Setup Instructions

### Step 1: Clone the Repository

1. Clone the repository and navigate to the directory:

    ```bash
    git clone https://github.com/peii14/water-leak-IOT
    cd water-leak-IOT
    ```

### Step 2: Build and Start Docker Containers

1. Build and start the Docker containers:

    ```bash
    docker-compose up --build -d
    ```

### Step 3: Access the PySpark Container

1. Access the PySpark container:

    ```bash
    docker exec -it pyspark /bin/bash
    ```

### Step 4: Install Python Libraries for Kafka Producer

1. Open a new terminal and navigate to the Kafka folder:

    ```bash
    cd water-leak-IOT/kafka
    ```

2. Install the required Python libraries:

    ```bash
    pip install influxdb-client numpy pandas==1.5.3 xgboost==1.5.1 pyspark pymongo
    ```

### Step 5: Install Dashboard Dependencies

1. Open another terminal, navigate to the dashboard directory, and install the dependencies:

    ```bash
    cd water-leak-IOT/dashboard
    yarn install
    ```

### Step 6: Run PostgreSQL Container

1. Run the PostgreSQL container:

    ```bash
    docker run -p 5432:5432 -d \
        --name water-leak \
        -e POSTGRES_PASSWORD=password \
        -e POSTGRES_USER=frontend \
        -e POSTGRES_DB=waterLeak \
        postgres
    ```

### Step 7: Update `tsconfig.json`

1. In the dashboard terminal, find and edit `tsconfig.json` to set `isolatedModules` to `false`.

    ```json
    // tsconfig.json
    {
        "compilerOptions": {
            // other options
            "isolatedModules": false
        }
    }
    ```

### Step 8: Seed the Database

1. Run the following command to seed an account for authentication:

    ```bash
    yarn seed
    ```

### Step 9: Run the Kafka Producer

1. In the Kafka folder, run:

    ```bash
    python3 producer.py
    ```

### Step 10: Run the Spark Processor

1. Return to the PySpark terminal and run:

    ```bash
    spark-submit --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.2.1 /spark/processor.py
    ```

### Step 11: Start the Dashboard

1. In the dashboard terminal, run:

    ```bash
    yarn dev
    ```

### Step 12: Access the Application

1. Open your browser and go to [http://localhost:3000](http://localhost:3000). Log in with the following credentials:

    - **Username:** John
    - **Password:** password

Congratulations! You have successfully set up the Water Management Application.
