import PyPDF2

def extract_text_from_pdf(file_path):
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text

text = extract_text_from_pdf("MSE2_Morning_Ques_Paper_AI.pdf")
with open("output.txt", "w", encoding="utf-8") as file:
    file.write(text)
