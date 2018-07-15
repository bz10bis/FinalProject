from docx import Document
import sys, os
import re
import unidecode

def getText(filename):

    try:
        # print(os.path.isfile(filename))
        print("getting text from "+filename)
        doc = Document(filename)
        fullText = []
        for para in doc.paragraphs:
            text = para.text.encode("utf-8")
            fullText.append(text)
        return b"\n".join(fullText)
    except Exception as e:
        print(e)

def cleanText(strValue):
    try:
        print("cleaning text")
        text = re.sub('[\[\]\!\@\#\$\%\^\&\*\(\)\_\-\–\;\+\<\>\°\'\"\?\’\’\.\,\,\:\‘\«\»\:\\\/\…\$\£\`\¤\§\#\~\|\`\^\@\€]', ' ', strValue.decode("utf-8"))
        text = text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ').replace(u'\xa0', ' ')
        text = re.sub(' +', ' ', text)
        return text
    except Exception as e:
        print(e)
