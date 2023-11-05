from sqlalchemy import create_engine, insert, text, MetaData, select
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from utils import to_list
import pandas as pd
import datetime

class Database() :
    
    def __init__(self):

        self.engine = create_engine("postgresql+psycopg2://postgres:postgres@db:5432/medicalDB")
        self.conn = self.engine.connect()
        self.meta_data = MetaData()
        self.meta_data.reflect(bind=self.engine)
        self.add_data = []

    def add(self, data) :
        """Add data to Postgres Database
        Args:
            data (List[List]): Data to add
        """
        query=text("INSERT INTO  medicaltable (nom_patient, diagnostic, date_injection, doctor)  VALUES(%s,%s, %s, %s)")
        for d in data :
            self.add_data.append((d[0], d[1], pd.to_datetime(datetime.datetime.now()), d[2]))
        self.conn.execute(query,self.add_data)
        self.add_data = []

    def require(self) :
        """Require informations to Postgres database

                Returns:
            data: data stored in Postgres database
        """
        query = text("SELECT * FROM medicaltable")
        data = self.conn.execute(query).fetchall()
        final_data = []
        for i in range(len(data)) :
            final_data.append([data[i][0], data[i][1], str(data[i][2].strftime("%d/%m/%Y, %H:%M:%S")), data[i][3]])
        return final_data
    