from fastapi import FastAPI, UploadFile, File
from PIL import Image
from pydantic import BaseModel
from typing import List
from predict import Inference
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

inf = Inference()

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
