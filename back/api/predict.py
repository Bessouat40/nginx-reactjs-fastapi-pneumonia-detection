import joblib
import numpy as np
from PIL import Image
from io import BytesIO


class Inference():

    def __init__(self):

        self.model = joblib.load('./models/random_forest_150x150x1.joblib')

    def load_single_image(self, bytes):
        """Load single image with associated bytes

        Args:
            bytes (List): bytes corresponding to the image

        Returns:
            img: numpy list corresponding to the loaded image 
        """
        image = BytesIO(bytes)
        pil_image = Image.open(image).convert('L') 
        img = np.array(pil_image)
        img_shape = (150,150,1)
        img_width, img_height, nb_canaux = img_shape[0], img_shape[1], img_shape[2]
        img = np.array([np.resize(img,(img_width, img_height))])
        return img

    def load_multiple_img(self, bytes) :
        """Load multiple images and set image value with them

        Args:
            bytes (List[List]): list of bytes corresponding to multiple images
        """
        liste = []
        for i in bytes :
            img = self.load_single_image(i)
            liste.append(img)
        x = np.asarray(liste)
        x = np.array(np.concatenate(x))
        x = x.reshape(len(bytes),150*150)
        self.image = x

    def predict_image(self):
        return self.model.predict(self.image)
