from fastapi import FastAPI, UploadFile, File
from PIL import Image
from pydantic import BaseModel
from typing import List
from predict import Inference
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

inf = Inference()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredResponse(BaseModel):
    sent_to_user: List[int] = []

@app.post('/prediction_multiple_pneumonia', response_model=List[int])
async def detect_pneumonia(images: List[UploadFile]=File(...)):
    images_bytes = []
    for image in images :
        images_bytes.append(image.file.read())
    inf.load_multiple_img(images_bytes)
    pred = list(inf.predict_image())
    return pred

@app.post('/prediction_single_pneumonia')
async def detect_pneumonia(image: UploadFile = File(...),):
    image_bytes = image.file.read()
    inf.load_single_img(image_bytes)
    pred = inf.predict_image()
    if pred[0] == 0 :
        diagnostic = "Le modèle n'a pas détecté de pneumonie"
    else :
        diagnostic = "Le modèle a détecté une pneumonie"
    return diagnostic