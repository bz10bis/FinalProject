import sys
import re
import unidecode

def getText(filename):
    ff = open(filename, 'rb')
    text = []
    for l in ff:
        text.append(l)
    text = b' '.join(text)
    return text

def cleanText(strValue):
    try:
        print("cleaning text")
        text = re.sub('[\[\]\!\@\#\$\%\^\&\*\(\)\_\-\–\;\+\<\>\°\'\"\?\’\’\.\,\,\:\‘\«\»\:\\\/\…\$\£\`\¤\§\#\~\|\`\^\@\€]', ' ', strValue.decode("utf-8"))
        text = text.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ').replace(u'\xa0', ' ')
        text = re.sub(' +', ' ', text)
        return text
    except Exception as e:
        print(e)