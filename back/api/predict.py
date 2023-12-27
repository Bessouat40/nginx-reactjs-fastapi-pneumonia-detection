import numpy as np
from io import BytesIO
import base64
from PIL import Image
import scipy.ndimage as sp
import matplotlib.pyplot as plt
import numpy as np
import matplotlib
matplotlib.use('Agg') 
from tensorflow.keras.models import Model
from tensorflow.keras import optimizers
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model


class Inference():

    def __init__(self):
        self.explain_model = self.load_explain_model()

    def load_single_image_explain(self, bytes) :
        image = BytesIO(bytes)
        img = Image.open(image).convert('RGB')
        img = img.resize((224,224))
        np_image = np.array(img) / 255.0
        return np_image
    
    def load_multiple_img_explain(self, bytes) :
        """Load multiple images and set image value with them

        Args:
            bytes (List[List]): list of bytes corresponding to multiple images
        """
        liste = []
        for i in bytes :
            img = self.load_single_image_explain(i)
            liste.append(img)
        self.images = np.array(liste)

    
    def predict_images_explain(self):
        return [int(predict > 0.5) for predict in self.explain_model.predict(self.images)]
    
    def plot_activation(self, img):
        pred = self.explain_model.predict(img[np.newaxis,:,:,:])
        pred_class = int(pred > 0.5)
        weights = self.explain_model.layers[-1].get_weights()[0]
        class_weights = weights[:, 0]
        intermediate = Model(self.explain_model.input,
                            self.explain_model.get_layer("block5_conv3").output)
        conv_output = intermediate.predict(img[np.newaxis,:,:,:])
        conv_output = np.squeeze(conv_output)
        h = int(img.shape[0]/conv_output.shape[0])
        w = int(img.shape[1]/conv_output.shape[1])
        act_maps = sp.zoom(conv_output, (h, w, 1), order=1)
        out = np.dot(act_maps.reshape((img.shape[0]*img.shape[1],512)), 
                    class_weights).reshape(img.shape[0],img.shape[1])
        buf = BytesIO()
        plt.figure()
        plt.imshow(img.astype('float32').reshape(img.shape[0], img.shape[1], 3))
        plt.imshow(out, cmap='jet', alpha=0.35)
        plt.title('Pneumonia' if pred_class == 1 else 'No Pneumonia')
        plt.axis('off')  
        plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0)
        plt.close()  
        buf.seek(0)
        image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        buf.close()
        return image_base64

    def load_explain_model(self):
        vgg_conv = VGG16(weights=None, include_top=False, input_shape=(224, 224, 3))
        x = vgg_conv.output
        x = GlobalAveragePooling2D()(x)
        x = Dense(1, activation="sigmoid")(x)
        model = Model(vgg_conv.input, x)
        weights_path = './models/explain_model.h5'
        model.load_weights(weights_path)
        model.compile(loss="binary_crossentropy",
                    optimizer=optimizers.legacy.SGD(learning_rate=0.005, momentum=0.9),
                    metrics=["accuracy"])
        return model
    
