FROM tensorflow/tensorflow

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
COPY ./api /app

RUN pip install -r requirements.txt

CMD python main.py