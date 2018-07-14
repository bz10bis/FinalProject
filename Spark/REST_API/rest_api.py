# -*- coding: UTF-8 -*-

import json as simplejson
import socket
import json

import cherrypy
import sys
from cherrypy import _cperror
from datetime import datetime
from datetime import timedelta
import random
import sys, os
from threading import Thread
import time
import textExtractDOCX_new as dx
import LDA_pyspark as lda

_demo = False

_flag_init = False
__version__ = '1.0'


# ----------- gestion de jsonp callback -----------------#
def jsonp(func):
    def ftemp(self, *args, **kwargs):
        callback, _ = None, None
        if 'callback' in kwargs and '_' in kwargs:
            callback, _ = kwargs['callback'], kwargs['_']
            del kwargs['callback'], kwargs['_']
        ret = func(self, *args, **kwargs)
        # cherrypy.response.headers['Content-Type'] = "APPLICATION/JSON"
        if callback is not None:
            ret = '%s(%s)' % (callback, simplejson.dumps(ret))
        return ret

    return ftemp


# Récupère les msg envoyés par un broker kafka
class parsing(object):
    @jsonp
    def index(self, file):
        try:    
            ff = os.path.join(r"D:\Documents\test_parsing_doc", file)
        except Exception as e:
            ff = ""
            print("rate 1")
            print(e)

        if ff != "":

            try:
                print("********** BEGINNING PROCESS **********")
                text = dx.getText(ff)
                if text != "":
                    cleaned_text = dx.cleanText(text)
                    ct = dx.unidecode.unidecode(cleaned_text)
                    data = ct
                else:
                    print("Text empty")

            except Exception as e:
                print(e)


            # try:
            #     data_cleaned = lda.strip_words(data)
            #     topics = lda.traitement(data_cleaned)
            #     for topic in range(len(topics)):
            #         print ("Topic" + str(topic) + ":")
            #         for term in topics[topic]:
            #             print (term)
            #         print ('\n')
            # except Exception as e:
            #     raise e

        # cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
        # return simplejson.dumps(data)
        return data

    index.exposed = True


# gestion des requetes
class RacineServeur(object):
    parsing = parsing()


if True:  # demarrage serveur
    try:
        ip = socket.gethostbyname(socket.gethostname())
        _ipServeur = socket.gethostbyname(socket.gethostname())
    except:
        ip = '127.0.0.1'

    port = 8000
    requette = 10

    for i in sys.argv:
        if i.upper().find('-IP:') == 0:
            ip = i.split(':')[1]
        if i.upper().find('-REQUEST:') == 0:
            requette = int(i.split(':')[1])
        if i.upper().find('-PORT:') == 0:
            try:
                port = int(i.split(':')[1])
            except:
                port = 8000

    print("**   Server xxxxxxx  **")
    print("* Version Server: " + __version__)
    print("")
    print("* Serveur IP: " + ip, "   Port: ", port)
    print("* Nombre de requettes: ", requette)
    print("")

    if True:  # (Licence!=None):
        print("--> demarrage en cours... ")
        try:

            server_config = {
                'server.socket_host': ip,
                'server.socket_port': port,
                'server.numthreads': requette,
                'server.thread_pool': requette,
                # 'log.error_file': 'SingleLine.log',
                'environment': 'production'
            }

            cherrypy.config.update(server_config)

            print("Lancement du serveur json")
            try:
                print("--> SERVEUR PRET")
                cherrypy.tree.mount(RacineServeur())
                print("--> OK")
                cherrypy.engine.start()
                cherrypy.engine.block()
            finally:
                print("****** SERVEUR KO **********")
                cherrypy.engine.stop()
                cherrypy.engine.block()

        except Exception:
            print("--> probleme de demarrage du serveur ---")

            print("erreur=", Exception)
