from transformers import pipeline
from PIL import Image
from io import BytesIO


class Inference():

    def __init__(self):

        model_name = 'BobCalifornia/v1-vit-pneumonia'
        self.model = pipeline(model=model_name, tokenizer=model_name)
        self.images = None

    def load_single_image(self, bytes):
        """Load single image with associated bytes

        Args:
            bytes (List): bytes corresponding to the image

        Returns:
            img: numpy list corresponding to the loaded image 
        """
        image = BytesIO(bytes)
        img = Image.open(image).convert("RGB")
        return img

    def load_multiple_img(self, bytes) :
        """Load multiple images and set image value with them

        Args:
            bytes (List[List]): list of bytes corresponding to multiple images
        """
        liste = []
        for byte in bytes :
            img = self.load_single_image(byte)
            liste.append(img)
        self.images = liste

    def predict_image(self):
        outputs = self.model(self.images)
        predictions = []
        for output in outputs :
            if output[0]['score'] > output[1]['score'] :
                predictions.append('0')
            else : predictions.append('1')
        return predictions
