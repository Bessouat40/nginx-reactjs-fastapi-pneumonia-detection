from fastapi import FastAPI, UploadFile, File
from PIL import Image
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
    allow_headers=["*"]
)

@app.post('/prediction_multiple_pneumonia')
async def detect_pneumonia(files: List[UploadFile] = File(...)):
    print('coucou')
    image_bytes = files.file.read()
    inf.load_single_img(image_bytes)
    pred = inf.predict_image()
    if pred[0] == 0 :
        diagnostic = "Le modèle n'a pas détecté de pneumonie"
    else :
        diagnostic = "Le modèle a détecté une pneumonie"
    return diagnostic

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