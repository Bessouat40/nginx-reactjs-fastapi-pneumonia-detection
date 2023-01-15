FROM ubuntu:bionic

RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install python3 python3-pip -y
RUN pip3 install --upgrade pip

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
COPY ./api /app

RUN pip3 install -r requirements.txt
RUN pip3 install -U scikit-learn

CMD python3 main.py