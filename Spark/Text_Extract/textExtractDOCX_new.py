from docx import Document
import sys
import re
import unidecode

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
        # ct1 = cleaned_text.encode("ascii", errors='ignore')
        # ct2 = str(ct1)
        of.write(ct)
except Exception as e:
    print(e)