#!/bin/bash
cd ./backend
docker build -t boxboys-login-service:latest -f Dockerfile-loginservice .
docker build -t boxboys-selleraccount-service:latest -f Dockerfile-SellerAccountService .
docker build -t boxboys-search-service:latest -f Dockerfile-SearchService .
