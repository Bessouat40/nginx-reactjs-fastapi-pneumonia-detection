from fastapi import FastAPI, UploadFile, File
from PIL import Image
from pydantic import BaseModel
from typing import List
from predict import Inference
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from database import Database

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

class PredResponse(BaseModel):
    sent_to_user: List[int] = []

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
async def add_data(data: List[List]):
    """Add Data to Postgres Database

    Args:
        data (List[List]): List containing name and diagnostic for all patients
    """
    print('data : ', data)
    db.add(data)
    print('coucou')