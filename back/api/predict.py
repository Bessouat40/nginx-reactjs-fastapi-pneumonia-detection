import joblib
import numpy as np
from PIL import Image
from io import BytesIO
import onnxruntime

class Inference():

    def __init__(self):

        self.model = joblib.load('./models/random_forest_150x150x1.joblib')
        self.ort_sess = onnxruntime.InferenceSession("./models/vit_model.onnx", providers=['CPUExecutionProvider'])
        print('onnx model ok : ', self.ort_sess)
        self.input_name = self.ort_sess.get_inputs()[0].name
        self.output_name = self.ort_sess.get_outputs()[0].name
        self.images = None
        self.inputs = None

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
        self.images = x

    def predict_image(self):
        return self.model.predict(self.images)
    
    def load_single_image_onnx(self, bytes):
        image = BytesIO(bytes)
        return Image.open(image).convert("RGB").resize((224, 224), Image.BILINEAR)
    
    def process_images_for_onnx_inference(self, image_paths) :
        images = [self.load_single_image_onnx(image_path) for image_path in image_paths]
        imgs = np.array([np.array(image, dtype=np.float32) / 255.0 for image in images])
        imgs = np.transpose(imgs, (0, 3, 1, 2))
        self.inputs = imgs
    
    def onnx_prediction(self) :
        print('coucou')
        outputs = self.ort_sess.run([self.output_name], {self.input_name: self.inputs})[0]
        print('coucou2')
        logits = np.array(outputs)
        print('coucou3')
        probabilities = np.exp(logits) / np.sum(np.exp(logits), axis=1, keepdims=True)
        print('coucou4')
        return np.argmax(probabilities, axis=1)
