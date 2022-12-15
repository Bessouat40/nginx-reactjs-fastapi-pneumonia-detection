# Logiciel d'aide au diagnostic d'une pneumonie

## Lancement du logiciel (sans docker)

* `git clone https://github.com/Bessouat40/reactjs-fastapi-pneumonia-detection.git`

Se placer dans le répertoire du projet

### Lancement de la partie frontend

* `cd front`

* `npm install`

* `npm start`

### Lancement de la partie backend

* `cd back`

* `pip install -r requirements.txt`

* `python main.py`

## Lancement du logiciel avec Docker

* `docker-compose build && docker-compose up`

Ensuite rendez vous à cette url pour visualiser le logiciel : `http://localhost:3000/`


## Visuel de l'application

![gif_demo](https://github.com/Bessouat40/reactjs-fastapi-pneumonia-detection/blob/main/screen/demo.gif)
