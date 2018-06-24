import docx 
import sys
import re

inFile = sys.argv[1]
outFile = sys.argv[2]

def getText(filename):
    doc = docx.Document(filename)
    fullText = []
    for para in doc.paragraphs:
        fullText.append(para.text)
    return '\n'.join(fullText)

def cleanText(strValue):
    text = re.sub('[\[\]\!\@\#\$\%\^\&\*\(\)\_\-\–\;\+\<\>\°\'\"\?\’\’\.\,\,\:\‘\«\»\:\\\/\…\$\£\`\¤\§\#\~\|\`\^\@\€]', ' ', strValue)
    text = text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ').replace(u'\xa0', ' ')
    text = re.sub(' +', ' ', text)
    return text

try:
	text = getText(inFile)
	cleaned_text = cleanText(text)
	with open(outFile, 'w') as of:
		of.write(cleaned_text)
except Exception as e:
	print(e)