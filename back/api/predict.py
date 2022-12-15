import joblib
import numpy as np
from PIL import Image
from io import BytesIO


class Inference():

    def __init__(self):

        self.model = joblib.load('./models/random_forest_150x150x1.joblib')

    def load_single_img(self, bytes) :
        image = BytesIO(bytes)
        pil_image = Image.open(image).convert('L') 
        img = np.array(pil_image)
        img_shape = (150,150,1)
        img_width, img_height, nb_canaux = img_shape[0], img_shape[1], img_shape[2]
        img = np.resize(img,(img_width, img_height))
        x = np.asarray([img])
        x = np.array(np.concatenate(x))
        x = x.reshape((1,150*150))
        self.image = x

    def load_multiple_img(self, bytes) :
        liste = []
        for i in bytes :
            image = BytesIO(i)
            pil_image = Image.open(image).convert('L') 
            img = np.array(pil_image)
            img_shape = (150,150,1)
            img_width, img_height, nb_canaux = img_shape[0], img_shape[1], img_shape[2]
            img = np.array([np.resize(img,(img_width, img_height))])
            liste.append(img)
        x = np.asarray(liste)
        x = np.array(np.concatenate(x))
        x = x.reshape(len(bytes),150*150)
        self.image = x

    def predict_image(self):
        return self.model.predict(self.image)

