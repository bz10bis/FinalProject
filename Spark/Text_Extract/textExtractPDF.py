import PyPDF2 as pdf 
import sys
import re
import unidecode

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
            brut_text = pageObj.extractText()
            cleaned_text
            text += pageObj.extractText()

    return '\n'.join(text)

def cleanText(strValue):
    text = re.sub('[\[\]\!\@\#\$\%\^\&\*\(\)\_\-\–\;\+\<\>\°\'\"\?\’\’\.\,\,\:\‘\«\»\:\\\/\…\$\£\`\¤\§\#\~\|\`\^\@\€]', ' ', strValue)
    text = text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ').replace(u'\xa0', ' ')
    text = re.sub(' +', ' ', text)
    return text
    
try:
    print("********** BEGINNING PROCESS **********")
    text = getText(inFile)
    if text != "":
        cleaned_text = cleanText(text)
    else:
        print("text empty")
    with open(outFile, 'w') as of:
        print("Writing File")
        ct = unidecode.unidecode(cleaned_text)
        print(ct)
except Exception as e:
    print(e)
