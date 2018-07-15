import PyPDF2 as pdf 
import re
import unidecode

def getText(filename):
    with open(filename, 'rb') as pdfFileObj:
        pdfReader = pdf.PdfFileReader(pdfFileObj)
        num_pages = pdfReader.numPages
        count = 0
        text = ""
        while count < num_pages:
            pageObj = pdfReader.getPage(count)
            count +=1
            brut_text = pageObj.extractText()
            text += pageObj.extractText()
    return "".join(text)

def cleanText(strValue):
    try:
        print("cleaning text")
        text = re.sub('[\[\]\!\@\#\$\%\^\&\*\(\)\_\-\–\;\+\<\>\°\'\"\?\’\’\.\,\,\:\‘\«\»\:\\\/\…\$\£\`\¤\§\#\~\|\`\^\@\€]', ' ', strValue)
        text = text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ').replace(u'\xa0', ' ')
        text = re.sub(' +', ' ', text)
        return text
    except Exception as e:
        print(e)

