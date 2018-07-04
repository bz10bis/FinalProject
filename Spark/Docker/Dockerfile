FROM sequenceiq/hadoop-docker:2.6.0
MAINTAINER GCA_projet_annuel

#Upload from disk
RUN mkdir -p /home/projet_annuel/test
RUN mkdir -p /home/projet_annuel/TextExtract
ADD Text_Extract/textExtractDOCX_new.py /home/projet_annuel/TextExtract
ADD Text_Extract/textExtractOTHER.py /home/projet_annuel/TextExtract
ADD Text_Extract/textExtractPDF.py /home/projet_annuel/TextExtract
ADD Text_Extract/test_memoire_1.docx /home/projet_annuel/test
ADD Text_Extract/test_memoire_1.pdf /home/projet_annuel/test

#Install Hadoop suite
RUN curl -s http://d3kbcqa49mib13.cloudfront.net/spark-1.6.1-bin-hadoop2.6.tgz | tar -xz -C /usr/local/
RUN cd /usr/local && ln -s spark-1.6.1-bin-hadoop2.6 spark
ENV SPARK_HOME /usr/local/spark
RUN mkdir $SPARK_HOME/yarn-remote-client
ADD yarn-remote-client $SPARK_HOME/yarn-remote-client

RUN $BOOTSTRAP && $HADOOP_PREFIX/bin/hdfs dfsadmin -safemode leave && $HADOOP_PREFIX/bin/hdfs dfs -put $SPARK_HOME-1.6.1-bin-hadoop2.6/lib /spark

ENV YARN_CONF_DIR $HADOOP_PREFIX/etc/hadoop
ENV PATH $PATH:$SPARK_HOME/bin:$HADOOP_PREFIX/bin
# update boot script
COPY bootstrap.sh /etc/bootstrap.sh
RUN chown root.root /etc/bootstrap.sh
RUN chmod 700 /etc/bootstrap.sh

#install R
RUN rpm -ivh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
RUN yum -y install R

#install Python3.4
RUN yum -y install python-devel python34 python34-setuptools vim
RUN easy_install-3.4 pip
# RUN yum -y install python-pip
# RUN yum -y install libxml2 libxml2-devel
RUN pip3 install python-docx
RUN pip3 install pyPDF2
RUN pip3 install pyspark
RUN pip3 install findspark

ENTRYPOINT ["/etc/bootstrap.sh"]