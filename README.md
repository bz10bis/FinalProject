### Status
[![Build Status](https://travis-ci.org/bz10bis/FinalProject.svg?branch=master)](https://travis-ci.org/bz10bis/FinalProject.svg?branch=master)

# FinalProject
Repository of our final project 

## Contributeurs
Baptiste Zegre
Julien Sarrazin 
Gerome Cabezas

## Structure

### Blockchain
Contient toutes les ressources relatives a la blockchain privée ETH incluant les SmartContracts les test et les commandes 


Pour lancer le noeud academia manuellement:

```
cd /root/nodeAcademia/
geth --rpc --rpcport 8545 --port 30303 --rpcaddr 0.0.0.0 --rpcapi eth,net,web3,personal,
clique --datadir node/ --unlock 0x5c8711c24ea9220fea3c3cb9e994911adfce4bdf --networkid 15 --mine --rpccorsdomain "*" --password passfile
```

Pour manager le noeur via systemctl
```
systemctl start geth
systemctl stop geth
systemctl status geth
```

#### Smart contract addresses

* SafeMath: ```0x9c9b6fb30c26904abcc11492a88eaa91bed2e3de```
* AcademiaToken: ```0x05a3d2e93d1fbe34517c6080af16505436c1e7be```
* AcademiaDocumentStorageManager: ```0x331f2f1986ec10a199e0603d8478b850e49208fa```
* AcademiaDiplomaManager:```0x6c3597558366b3ac76f660c57e495c95d993182b```
* AcademiaTokenSale:```
* AcademiaGroupManager:```


### Spark 

Spark est utilisé pour la mise en place d'algorithme de LDA, dans le but de générer 
les thèmes d'un document en entrée.

### Cherry Py

Serveur backend permettant la création d'API REST.

Les API :
* upload : Permet le lancement de la chaine de traitement. Prend le nom du fichier et le contributeur comme paramètre. ``` http://51.38.189.242:8000/upload/?file=<fichier>&contributor=<contributeur>```
* list_tokens : Permet de récupérer les métadonnées d'un token passé en argument. ``` http://51.38.189.242:8000/list_token/?token=<token>```
* find_file : Permet le listage des fichiers en base de données. ``` http://51.38.189.242:8000/find_file/?file=<chaine de caractères>```
* file_info : Permet de récupérer les métadonnées par rapport au nom d'un fichier passé en paramètre. ``` http://51.38.189.242:8000/file_info/?file=<fichier>```

La chaine de traitement agit comme suit : 
* Vérification de l'existence du fichier sur le serveur
* Parsing du fichier passé en entrée
* Création d'un hash basé sur le contenu du fichier
* Envoi du contenu parsé dans un LDA, permettant la génération des thèmes des documents
* Sauvegarde du fichier original et du fichier de métadonnées dans hadoop

### React

### Express