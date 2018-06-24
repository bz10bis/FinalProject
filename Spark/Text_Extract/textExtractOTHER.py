import sys
import re

inFile = sys.argv[1]
outFile = sys.argv[2]

def getText(filename):
    ff = open(inFile, 'r')
    text = []
    for l in ff:
        text.append(l)
    text = ' '.join(text)
    return text

def cleanText(strValue):
    text = re.sub(r'[!@#$%^&*()_+<>\'\"?\’’\.,,]', ' ', strValue)
    text = text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
    text = re.sub(' +', ' ', text)
    return text

try:
    text = getText(inFile)
    cleaned_text = cleanText(text)
    with open(outFile, 'w') as of:
        of.write(cleaned_text)
except Exception as e:
    print(e)