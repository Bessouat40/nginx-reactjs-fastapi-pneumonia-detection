from sqlalchemy import create_engine, insert, text, MetaData, select
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from utils import to_list

class Database() :
    
    def __init__(self):

        self.engine = create_engine("postgresql+psycopg2://postgres:postgres@db:5432/medicalDB")
        self.conn = self.engine.connect()
        self.meta_data = MetaData(bind=self.conn)
        self.add_data = []

    def add(self, data) :
        """Add data to Postgres Database
        Args:
            data (List[List]): Data to add
        """
        query="INSERT INTO  medicaltable (nom_patient, diagnostic)  VALUES(%s,%s)"
        for d in data :
            self.add_data.append((d[0], d[1]))
        self.conn.execute(query,self.add_data)
        self.add_data = []

    def require(self) :
        """Require informations to Postgres database

        Returns:
            data: data stored in Postgres database
        """
        data = self.conn.execute("SELECT * FROM medicaltable").fetchall()
        final_data = to_list(data)
        return final_data
    