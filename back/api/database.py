from sqlalchemy import create_engine, insert, text
import time

class Database() :
    
    def __init__(self):

        self.engine = create_engine("postgresql+psycopg2://postgres:postgres@db:5432/medicalDB")
        self.conn = self.engine.connect()


    def add(self, data) :
        """Add data to Postgres Database

        Args:
            data (List[List]): Data to add
        """
        query="INSERT INTO  medicalTable (nom_patient, diagnostic)  VALUES(%s,%s)"
        my_data=data
        self.conn.execute(query,my_data)
