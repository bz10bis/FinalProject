import pyspark
import nltk
import os
import sys
from pyspark.conf import SparkConf
from pyspark.context import SparkContext
from pyspark.sql import SQLContext, Row, SparkSession
from pyspark.ml.feature import CountVectorizer
from pyspark.mllib.clustering import LDA, LDAModel
from pyspark.mllib.linalg import Vector, Vectors
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import unidecode

# nltk.download("stopwords")
# nltk.download('punkt')

conf = SparkConf().setAppName("LDA")
sc = SparkContext(conf=conf)
spark = SparkSession.builder.config(conf=conf).getOrCreate()

wordNumbers = 5  # number of words per topic
nbTopics = 1  # number of topics
stopWords = set(stopwords.words('french'))

def topic_render(topic, vocabArray):  # specify vector id of words to actual words
    terms = topic[0]
    result = []
    for i in range(wordNumbers):
        term = vocabArray[terms[i]]
        result.append(term)
    return result

try:
    strValue = sys.argv[1:]
    data = ' '.join(strValue)
except Exception as e:
    print(e)

def wordTokenize(str):
    try:
        data = str.decode('utf-8')
    except:
        try:
            data = str.decode('latin-1')
        except:
            data = str
            pass

    words = word_tokenize(data)
    wordsFiltered = []
    adjectifs = ["ABSOLU","ADMIRABLE","AGREABLE","AIMABLE","AMUSANT","APOCALYPTIQUE","APPROXIMATIF","ATTACHANT","BANAL","BAS","BAVAROIS","BIEN","BOF","BON","BOULEVERSANT","BOUTE EN TRAIN","CAPTIVANT","CARACTERIEL","CATACLYSMIQUE","CATASTROPHIQUE","CELESTE","CHARMANT","CHEF D'OEUVRE","CHOUETTE","COMMUN","CONVENABLE","CONVIVIAL","COQUET","CORRECT","CREDIBLE","CROQUANTE","CYNIQUE","DEGUEULASSE","DELECTABLE","DELICIEUSE","DISJONCTE","DIVIN","DOUCE","DOUE","DROLE","EBLOUISSANT","EBOURIFFE","EFFICACE","EMBALLANT","EMOUVANT","ENDIABLE","ENNUYANT","ENRAGE","ENTHOUSIASMANT","EPATANT","EPOUSTOUFLANT","EPOUVANTABLE","EQUITABLE","EXALTANT","EXCEPTIONNEL","EXCUSABLE","EXEMPLAIRE","EXTRA","FERU","FESTIF","FLAMBOYANTE","FORMIDABLE","GRANDIOSE","HARDI","HONNETE","HORRIBLE","IMPORTANT","IMPRESSIONNANT","INCONNU","INCREDULE","INDEPENDANT","INFERNAL","INNOMMABLE","INSIGNIFIANT","INSUFFISANT","INSUPPORTABLE","INTENABLE","INTERESSANT","IRRESISTIBLE","LIBIDINEUX","LOUABLE","MAJESTUEUX","MAGISTRAL","MAGNIFIQUE","MEDIOCRE","MERDIQUE","MERVEILLEUX","MIGNON","MINABLE","MIROBOLANTE","MORTEL","MOYEN","NEGLIGEABLE","NUL","ORDINAIRE","ORIGINAL","PARFAIT","PIRE","PASSABLE","PASSIONNANT","PERCUTANT","PERSEVERANT","PHENOMENAL","PLACIDE","PLAISANT","PRESTANT","PRODIGIEUX","PROVERBIAL","QUELCONQUE","RAVISSANT","RECYCLE","RELATIF","REMARQUABLE","RENVERSANT","REVENDICATRICE","REVOLUTIONNAIRE","ROCAMBOLESQUE","RUTILANT","SAINT","SATISFAISANT","SEDUISANT","SEXY","SOMPTUEUX","SPIRITUEUX","SPLENDIDE","SUAVE","SUBLIME","SULFUREUSE","SUPERBE","SUPREME","SUPPORTABLE","TALENTUEUX","TOLERABLE","TRAGIQUE","TREPIDANT","TRES","TROUBLANT","VALABLE","VALEUREUX","VENERABLE","VITAMINES","VIVABLE","VULGAIRE"]
    spotwordsComplement = ['LE', 'LA', 'LES', 'UN', 'DES','COMME', 'A', 'QUE', 'PLUS', 'OUI', 'NON', 'PEUT', 'CES', 'CETTE', 'CET', 'MAIS', 'OU', 'ET', 'DONC', 'TOUS', 'TOUTE', 'LEUR', 'TOUTES', 'LEURS', 'AINSI', 'BIEN', 'MAL', 'ETRE', 'AVOIR', 'FAIRE', 'AVEC', 'SANS', 'PLUS', 'MOINS']

    for w in words:
        if w not in stopWords and w.upper() not in adjectifs and w.upper() not in spotwordsComplement and len(w)>2:
            wordsFiltered.append(w)

    txt = " ".join(wordsFiltered).lower()
    return txt

def LDA_Treatment(str):
    finalTopics = []
    txt = wordTokenize(str)
    data = sc.parallelize([txt]).zipWithIndex().map(lambda val: Row(idd=val[1], _words=val[0].split(" ")))
    docDF = spark.createDataFrame(data, ["_words"])
    Vector = CountVectorizer(inputCol="_words", outputCol="vectors")
    model = Vector.fit(docDF)
    result = model.transform(docDF)
    corpus = result.select("idd", "vectors").rdd.map(lambda val: [val[0], Vectors.fromML(val[1])]).cache()
    ldaModel = LDA.train(corpus, k=nbTopics, maxIterations=1000, optimizer='online')
    topics = ldaModel.topicsMatrix()
    vocabArray = model.vocabulary
    topicIndices = sc.parallelize(ldaModel.describeTopics(maxTermsPerTopic=wordNumbers))
    topics_final = topicIndices.map(lambda topic: topic_render(topic, vocabArray)).collect()

    for topic in range(len(topics_final)):
        for term in topics_final[topic]:
            term = unidecode.unidecode(term)
            finalTopics.append(term)

    return finalTopics