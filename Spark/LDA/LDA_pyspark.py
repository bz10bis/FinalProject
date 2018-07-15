import nltk
from pyspark.sql import SQLContext, Row
from pyspark.ml.feature import CountVectorizer
from pyspark.mllib.clustering import LDA, LDAModel
from pyspark.mllib.linalg import Vector, Vectors
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

# nltk.download("stopwords")

path = "D:/PROJET_ANNUEL/FinalProject/Spark/Docker/LDA/blou.txt"
ff = open(path, "r")
data = ff.read()

stopWords = set(stopwords.words('french'))
#print(stopWords)

words = word_tokenize(data)
wordsFiltered = []

adjectifs = ["ABSOLU","ADMIRABLE","AGREABLE","AIMABLE","AMUSANT","APOCALYPTIQUE","APPROXIMATIF","ATTACHANT","BANAL","BAS","BAVAROIS","BIEN","BOF","BON","BOULEVERSANT","BOUTE EN TRAIN","CAPTIVANT","CARACTERIEL","CATACLYSMIQUE","CATASTROPHIQUE","CELESTE","CHARMANT","CHEF D'OEUVRE","CHOUETTE","COMMUN","CONVENABLE","CONVIVIAL","COQUET","CORRECT","CREDIBLE","CROQUANTE","CYNIQUE","DEGUEULASSE","DELECTABLE","DELICIEUSE","DISJONCTE","DIVIN","DOUCE","DOUE","DROLE","EBLOUISSANT","EBOURIFFE","EFFICACE","EMBALLANT","EMOUVANT","ENDIABLE","ENNUYANT","ENRAGE","ENTHOUSIASMANT","EPATANT","EPOUSTOUFLANT","EPOUVANTABLE","EQUITABLE","EXALTANT","EXCEPTIONNEL","EXCUSABLE","EXEMPLAIRE","EXTRA","FERU","FESTIF","FLAMBOYANTE","FORMIDABLE","GRANDIOSE","HARDI","HONNETE","HORRIBLE","IMPORTANT","IMPRESSIONNANT","INCONNU","INCREDULE","INDEPENDANT","INFERNAL","INNOMMABLE","INSIGNIFIANT","INSUFFISANT","INSUPPORTABLE","INTENABLE","INTERESSANT","IRRESISTIBLE","LIBIDINEUX","LOUABLE","MAJESTUEUX","MAGISTRAL","MAGNIFIQUE","MEDIOCRE","MERDIQUE","MERVEILLEUX","MIGNON","MINABLE","MIROBOLANTE","MORTEL","MOYEN","NEGLIGEABLE","NUL","ORDINAIRE","ORIGINAL","PARFAIT","PIRE","PASSABLE","PASSIONNANT","PERCUTANT","PERSEVERANT","PHENOMENAL","PLACIDE","PLAISANT","PRESTANT","PRODIGIEUX","PROVERBIAL","QUELCONQUE","RAVISSANT","RECYCLE","RELATIF","REMARQUABLE","RENVERSANT","REVENDICATRICE","REVOLUTIONNAIRE","ROCAMBOLESQUE","RUTILANT","SAINT","SATISFAISANT","SEDUISANT","SEXY","SOMPTUEUX","SPIRITUEUX","SPLENDIDE","SUAVE","SUBLIME","SULFUREUSE","SUPERBE","SUPREME","SUPPORTABLE","TALENTUEUX","TOLERABLE","TRAGIQUE","TREPIDANT","TRES","TROUBLANT","VALABLE","VALEUREUX","VENERABLE","VITAMINES","VIVABLE","VULGAIRE"]
articles = ['LE', 'LA', 'LES', 'UN', 'DES', 'A', 'QUE', 'PLUS', 'OUI', 'NON', 'PEUT']

for w in words:
    if w not in stopWords and w.upper() not in article and w.upper() not in adjectifs and len(w)>2:
        wordsFiltered.append(w)

txt = " ".join(wordsFiltered).lower()

data = sc.parallelize([txt]).zipWithIndex().map(lambda val: Row(idd= val[1], words = val[0].split(" ")))

docDF = spark.createDataFrame(data)
Vector = CountVectorizer(inputCol="words", outputCol="vectors")
model = Vector.fit(docDF)
result = model.transform(docDF)

corpus = result.select("idd", "vectors").rdd.map(lambda val: [val[0],Vectors.fromML(val[1])]).cache()

# Cluster the documents into three topics using LDA
ldaModel = LDA.train(corpus, k=3,maxIterations=700,optimizer='online')
topics = ldaModel.topicsMatrix()
vocabArray = model.vocabulary

wordNumbers = 5  # number of words per topic
topicIndices = sc.parallelize(ldaModel.describeTopics(maxTermsPerTopic = wordNumbers))

def topic_render(topic):  # specify vector id of words to actual words
    terms = topic[0]
    result = []
    for i in range(wordNumbers):
        term = vocabArray[terms[i]]
        result.append(term)
    return result

topics_final = topicIndices.map(lambda topic: topic_render(topic)).collect()

for topic in range(len(topics_final)):
    print ("Topic" + str(topic) + ":")
    for term in topics_final[topic]:
        print (term)
    print ('\n')