# odoo-challenge-frontend
Odoo Challenge Frontend

## Introduction
In this tutorial you will deploy odoo challenge frontend based on Reeact.Js

## Prerequisite
Ubuntu 18 or above

### SSH into Cloud Server
ssh -i "server-key.pem" username@SERVER_IP


### Step 1 — Installing Docker Compose
To install the docker-compose command line tool, refresh your package list, then install the package using apt:

sudo apt update
sudo apt install docker-compose

You can confirm that the package is installed by running the following command:

docker-compose –-version

You should receive output like the following:

Output
docker-compose version 1.29.2, build unknown

Once you have confirmed that Docker Compose is installed on your server, you will configure and launch Odoo and PostgreSQL using Docker Compose in the next step of this tutorial.

### Step 2 — Running Odoo and PostgreSQL with Docker Compose
