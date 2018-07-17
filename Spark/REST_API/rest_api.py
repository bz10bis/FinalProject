# -*- coding: UTF-8 -*-

import json as simplejson
import socket
import json
import hashlib
import cherrypy
import sys
from cherrypy import _cperror
from datetime import datetime
from datetime import timedelta
import random
import os
from os.path import basename
from threading import Thread
import time
import textExtractDOCX_new as dx
import textExtractPDF as px
import textExtractOTHER as ox
import LDA_pyspark as lda
# import docker
import tarfile
from io import BytesIO
import PyPDF2

_demo = False

_flag_init = False
__version__ = '1.0'

tokens = {}
# tls_config = docker.tls.TLSConfig(
#     client_cert=('D:\certs\cert.pem', 'D:\certs\key.pem'),
#     ca_cert='D:\certs\ca.pem'
#     )
# client = docker.DockerClient(base_url="192.168.99.100:2376",tls=tls_config)


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


def find_ext(filename):
    try:
        ext = filename.strip().split('.')
        if ext[-1].upper() in ["DOCX", "PDF", "TXT"]:
            return ext[-1].upper()
        else:
            return 0
    except Exception as e:
        raise e


def pdf_process(file):
    try:
        print("********** BEGINNING PDF PROCESS **********")
        text = px.getText(file)
        if text != "":
            cleaned_text = px.cleanText(text)
            ct = px.unidecode.unidecode(cleaned_text)
            return ct
        else:
            print("Text empty")
            exit(0)

    except Exception as e:
        print(e)
        exit(0)


def docx_process(file):
    try:
        print("********** BEGINNING DOCX PROCESS **********")
        text = dx.getText(file)
        if text != "":
            cleaned_text = dx.cleanText(text)
            ct = dx.unidecode.unidecode(cleaned_text)
            return ct
        else:
            print("Text empty")
            exit(0)

    except Exception as e:
        print(e)
        exit(0)


def other_process(file):
    try:
        print("********** BEGINNING PROCESS **********")
        text = ox.getText(file)
        if text != "":
            cleaned_text = ox.cleanText(text)
            ct = ox.unidecode.unidecode(cleaned_text)
            return ct
        else:
            print("Text empty")
            exit(0)

    except Exception as e:
        print(e)
        exit(0)


def hashDoc(string, token):
    hashCode = ""
    try:
        string = string.encode("utf-8")
        hashCode = hashlib.sha256(string).hexdigest()
        tokens[token]["hashCode"] = hashCode
    except Exception as e:
        print(e)

    return hashCode


def saveFile(file, token):

    newfile = basename(file)
    newfile = "meta_"+newfile+".txt"
    # newfile = os.path.join("D:\Documents\\test_parsing_doc",newfile)
    f = ""
    for w in tokens[token]:
        f += w+":"+tokens[token][w]+"\n"
    with open(newfile, "w") as of:
        of.write(f)



    print(a)


def lda_spark(stringText, token):
    global tokens
    lst_topics = lda.LDA_Treatment(stringText)
    tokens[token]["topics"] = ",".join(lst_topics)


def parsingFile(file, token):
    global tokens
    try:    
        ff = os.path.join("/home","FinalProject","ExpressServer","uploads", file)
    except Exception as e:
        ff = ""
        data = "Error"
        print(e)
    if ff != "":
        ext_val = find_ext(ff)
        if ext_val == "DOCX":
            data = docx_process(ff)
        elif ext_val == "PDF":
            data = pdf_process(ff)
        elif ext_val == "TXT":
            data = other_process(ff)
        else:
            data = "nothing"
        tokens[token]["parsing"] = data
        return data


def globalProcess(file, token):
    try:
        # saveFile(file, token)
        stringDoc = parsingFile(file, token)
        hashDoc(stringDoc, token)
        lda_spark(stringDoc, token)
        print("DONE FOR TOKEN " + token)
    except Exception as e:
        raise e


class upload(object):
    @jsonp
    def index(self, file):
        global tokens 
        try:
            tok = ''
            # verification si fichier existe
            if os.path.exists(os.path.join("/home","FinalProject","ExpressServer","uploads", file)):
                # Create random token
                tok = ''.join(random.choice("abcdefghijklmnopqrstuvwxyz1234567890") for _ in range(25))
                # initialisation de la variable
                if tok not in tokens:
                    tokens[tok] = {"parsing" : "pending",
                    "topics" : "pending",
                    "hashCode" : "pending",
                    "saved" : "pending"}
                    thread = Thread(target = globalProcess, args = (file, tok))
                    thread.start()
            else:
                return False
        except Exception as e:
            print(e)

        # cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
        # return simplejson.dumps(data)
        return tok

    index.exposed = True


class list_tokens(object):
    @jsonp
    def index(self, token):
        try:
            data = {"parsing" : tokens[token]["parsing"],
                    "topics" : tokens[token]["topics"],
                    "hashCode" : tokens[token]["hashCode"],
                    "saved" : tokens[token]["saved"]}
        except Exception as e:
            print(e)
        cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
        return simplejson.dumps(data)
    index.exposed = True


# gestion des requetes
class RacineServeur(object):
    upload = upload()
    list_tokens = list_tokens()


if True:  # demarrage serveur
    try:
        ip = socket.gethostbyname(socket.gethostname())
        _ipServeur = socket.gethostbyname(socket.gethostname())
    except:
        ip = '127.0.0.1'

    port = 8000
    requete = 10

    for i in sys.argv:
        if i.upper().find('-IP:') == 0:
            ip = i.split(':')[1]
        if i.upper().find('-REQUEST:') == 0:
            requete = int(i.split(':')[1])
        if i.upper().find('-PORT:') == 0:
            try:
                port = int(i.split(':')[1])
            except:
                port = 8000

    print("**   Server xxxxxxx  **")
    print("* Version Server: " + __version__)
    print("")
    print("* Serveur IP: " + ip, "   Port: ", port)
    print("* Nombre de requetes: ", requete)
    print("")

    if True:
        print("--> demarrage en cours... ")
        try:

            server_config = {
                'server.socket_host': '0.0.0.0',
                'server.socket_port': port,
                'server.numthreads': requete,
                'server.thread_pool': requete,
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
