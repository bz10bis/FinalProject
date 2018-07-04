import PyPDF2 as pdf 
import sys
import re

inFile = sys.argv[1]
outFile = sys.argv[2]

def getText(filename):
    with open(inFile, 'rb') as pdfFileObj:
        pdfReader = pdf.PdfFileReader(pdfFileObj)
        num_pages = pdfReader.numPages
        count = 0
        text = ""
        while count < num_pages:
            pageObj = pdfReader.getPage(count)
            count +=1
            text += pageObj.extractText()
    return '\n'.join(text)

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