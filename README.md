# Logiciel d'aide au diagnostic d'une pneumonie

## Lancement du logiciel (sans docker)

* `git clone https://github.com/Bessouat40/Logiciel-d-aide-au-diagnostic.git`

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

![screenshot1](https://github.com/Bessouat40/Logiciel-d-aide-au-diagnostic/blob/main/screen/accueil.png?raw=true)

![screenshot2](https://github.com/Bessouat40/Logiciel-d-aide-au-diagnostic/blob/main/screen/pred_simple_image.png?raw=true)

![screenshot3](https://github.com/Bessouat40/Logiciel-d-aide-au-diagnostic/blob/main/screen/batch.png?raw=true)
