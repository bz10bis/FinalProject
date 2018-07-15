FROM ubuntu:latest
MAINTAINER GCA_projet_annuel

# SETUP ENVIRONMENT
RUN apt-get -qq update
RUN apt-get -qq upgrade -y
RUN apt-get -qq install python3.6 -y
RUN apt-get -qq install software-properties-common -y
RUN apt-get -qq install wget -y
RUN apt-get -qq install vim -y

RUN apt-get -qq install python3-pip -y
RUN pip3 install python-docx
RUN pip3 install pyPDF2
RUN pip3 install pyspark
RUN pip3 install findspark
RUN pip3 install nltk
RUN pip3 install numpy
RUN pip3 install unidecode

RUN cp /usr/bin/python3.6 /usr/bin/python
RUN mkdir -p /usr/local
ADD spark-2.3.1-bin-hadoop2.7.tgz /usr/local/
RUN cd /usr/local && ln -s spark-2.3.1-bin-hadoop2.7 spark
ENV SPARK_HOME /usr/local/spark

ADD jdk-8u171-linux-x64.tar.gz /usr/local/
# RUN tar -xz -C jdk-8u171-linux-x64.tar.gz /usr/local/
RUN cd /usr/local && ln -s jdk-8u171-linux-x64 java
ENV JAVA_HOME=/usr/local/jdk1.8.0_171/


# #Upload from disk
RUN mkdir -p /home/LDA/test
RUN mkdir -p /home/LDA/lib
ADD lib/LDA_pyspark.py /home/LDA/lib
ADD test/test_text.txt /home/LDA/test
ADD lib/lda_treatment /usr/bin
RUN chmod +x /usr/bin/lda_treatment

# ENTRYPOINT ["/etc/bootstrap.sh"]