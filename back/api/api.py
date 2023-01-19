from fastapi import FastAPI, UploadFile, File, Request
from PIL import Image
from pydantic import BaseModel
from typing import List
from predict import Inference
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from database import Database
from utils import recognize_data, split_data

inf = Inference()
db = Database()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/prediction_multiple_pneumonia', response_model=List[int])
async def detect_pneumonia(images: List[UploadFile]=File(...)):
    """Pneumonia detection on single or multiple images
    Args:
        images (List[UploadFile], optional): List of images as bytes
    Returns:
        pred: List corresponding to images diagnostic (0 : no pneumonia, 1 : pneumonia)
    """
    images_bytes = []
    for image in images :
        images_bytes.append(image.file.read())
    inf.load_multiple_img(images_bytes)
    pred = list(inf.predict_image())
    return pred

@app.post('/add_data')
async def add_data(data: Request):
    """Add Data to Postgres Database
    Args:
        data (List[List]): List containing name and diagnostic for all patients
    """
    form = await data.body()
    data_string = form.decode(encoding='utf-8')
    match_datas = recognize_data(data_string)[1:]
    datas = split_data(match_datas)
    db.add(datas)

@app.post('/require')
async def get_data():
    """Get data from database

    Returns:
        data: data stored in Postgres database
    """
    data = db.require()
    return data