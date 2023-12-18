import joblib
import numpy as np
from io import BytesIO
import onnxruntime
from PIL import Image


class Inference():


    def __init__(self, ort_sess, input_name, output_name):
        # self.ort_sess = onnxruntime.InferenceSession("./models/vit_model.onnx", providers=['CPUExecutionProvider'])
        # self.input_name = self.ort_sess.get_inputs()[0].name
        # self.output_name = self.ort_sess.get_outputs()[0].name
        self.model = joblib.load('./models/random_forest_150x150x1.joblib')
        self.ort_sess = ort_sess
        self.input_name = input_name
        self.output_name = output_name


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
        return self.model.predict(self.image)
    
    def load_onnx_image(self, bytes):
        decoded = BytesIO(bytes)
        image = Image.open(decoded).convert("RGB")
        image = image.resize((224, 224), Image.BILINEAR)
        img = np.array(image, dtype=np.float32)
        img /= 255.0
        img = np.transpose(img, (2, 0, 1))
        return img
    
    def onnx_inferences(self, bytes):
        inputs = np.array([self.load_onnx_image(path) for path in bytes])
        outputs = self.ort_sess.run([self.output_name], {self.input_name: inputs})[0]
        logits = np.array(outputs)
        probabilities = np.exp(logits) / np.sum(np.exp(logits), axis=1, keepdims=True)
        predicted_classes = np.argmax(probabilities, axis=1)
        return predicted_classes

