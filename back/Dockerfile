FROM python:3.9-slim

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install -U scikit-learn

COPY ./api /app

CMD python3 main.py