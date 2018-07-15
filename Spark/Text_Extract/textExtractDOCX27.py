# coding: utf-8

from docx import Document
import sys
import re

inFile = sys.argv[1]
outFile = sys.argv[2]

print("input file : "+inFile)
print("output file : "+outFile)

def getText(filename):
    try:
        print("getting text from "+inFile)
        doc = Document(filename)
        fullText = []
        for para in doc.paragraphs:
            fullText.append(para.text)
        return '\n'.join(fullText)
    except Exception, e:
        print(e)

def cleanText(strValue):
    try:
        print("cleaning text")
        text = re.sub('[\[\]\!\@\#\$\%\^\&\*\(\)\_\-\–\;\+\<\>\°\'\"\?\’\’\.\,\,\:\‘\«\»\:\\\/\…\$\£\`\¤\§\#\~\|\`\^\@\€]', ' ', strValue)
        text = text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ').replace(u'\xa0', ' ')
        text = re.sub(' +', ' ', text)
        return text
    except Exception, e:
        print(e)

try:
    print("********** BEGINNING PROCESS **********")    
    text = getText(inFile)    
    cleaned_text = cleanText(text)    
    with open(outFile, 'w') as of:    
    	of.write(cleaned_text)
except Exception, e:    
    print(e)