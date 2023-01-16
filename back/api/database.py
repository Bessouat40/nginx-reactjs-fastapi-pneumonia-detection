from sqlalchemy import create_engine, insert, text
import time

class Database() :
    
    def __init__(self):

        self.engine = create_engine("postgresql+psycopg2://postgres:postgres@db:5432/medicalDB")
        self.conn = self.engine.connect()
        self.add_data = []


    def add(self, data) :
        """Add data to Postgres Database
        Args:
            data (List[List]): Data to add
        """
        query="INSERT INTO  medicalTable (nom_patient, diagnostic)  VALUES(%s,%s)"
        for d in data :
            self.add_data.append((d[0], d[1]))
        self.conn.execute(query,self.add_data)
        self.add_data = []