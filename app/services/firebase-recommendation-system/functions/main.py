# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`


from firebase_functions import https_fn
from firebase_admin import initialize_app

initialize_app()

import spacy
import requests
import json
import fitz
import string
import re
import nltk
import os


# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')
root = os.path.dirname(os.path.abspath(__file__))
download_dir = os.path.join(root, 'nltk_data')
# os.chdir(download_dir)
nltk.data.path.append(download_dir)


def convertToText(fname):
    doc = fitz.open(fname)
    text = ""
    for page in doc:
        text = text + str(page.get_text())
    tx = " ".join(text.split("\n"))
    return tx

import en_core_web_sm
nlp = en_core_web_sm.load()


skills = "jz_skill_patterns.jsonl"

ruler = nlp.add_pipe("entity_ruler", before="ner")

ruler.from_disk(skills)

patterns = [{
    "label": "EMAIL", "pattern": [{"TEXT": {"REGEX": "([^@|\s]+@[^@]+\.[^@|\s]+)"}}]
},
{
    "label": "MOBILE", "pattern": [{"TEXT": {"REGEX": "\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4}"}}]
},

]

ruler.add_patterns(patterns)

def getEntities(doc):
  dict = {}
  skills = []
  i = 0
  for ent in doc.ents:
    if ent.label_ == "PERSON" and i == 0:
      dict['PERSON'] = ent.text
      i = i + 1
    if ent.label_ == "EMAIL":
      dict["EMAIL"] = ent.text
    if ent.label_ == "MOBILE":
      dict["MOBILE"] = ent.text
    if ent.label_ == "SKILL":
      skills.append(ent.text)

  skills = [i.capitalize() for i in set([i.lower() for i in skills])]
  dict["SKILLS"] = skills
  return dict




@https_fn.on_request()
def getRecommendedBasedOnSkills(req: https_fn.Request) -> https_fn.Response:
    import json
    jsonResponse = json.loads(req.data.decode('utf-8'))
    url = jsonResponse["resumeUrl"]
    response = requests.get(url)
    if response.status_code == 200:
      with open('resume', "wb") as f:
        f.write(response.content)
    else:
      print(response.status_code)

    resume_text = convertToText("resume")

    doc = nlp(resume_text)

    entities = getEntities(doc)

    job_offers = jsonResponse["positions"]



    recommended_offers = []
    for offer in job_offers:
      print(offer)
      unique_skills = set(skill for skill in offer["skills"] if skill in entities["SKILLS"])
      count = len(unique_skills)
      ratio = count / len(offer["skills"])
      if ratio >= 0.5:
        recommended_offers.append(offer)

    return https_fn.Response(json.dumps(recommended_offers))

def preprocess_text(text):
    from nltk.stem import WordNetLemmatizer

    from nltk.corpus import stopwords
    from nltk.tokenize import word_tokenize

    lemmatizer = WordNetLemmatizer()

    text = text.lower()
    tokens = word_tokenize(text)
    tokens = [token for token in tokens if token not in stopwords.words('english')]
    # remove punctuation
    tokens = [token for token in tokens if token not in string.punctuation]
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    text = ' '.join(tokens)
    return text

def cleanResume(text):
    from nltk.stem import WordNetLemmatizer
    from nltk.corpus import stopwords
    from nltk.tokenize import word_tokenize
    lemmatizer = WordNetLemmatizer()

    text = re.sub(r"http\S+", "", text)
    text = re.sub("[^A-Za-z]+", " ", text)

    tokens = nltk.word_tokenize(text)
    tokens = [w.lower().strip() for w in tokens if not w.lower() in stopwords.words("english")]
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    return tokens

@https_fn.on_request()
def getRecommendedBasedOnDescription(req: https_fn.Request) -> https_fn.Response:
    import json

    jsonResponse = json.loads(req.data.decode('utf-8'))
    url = jsonResponse["resumeUrl"]
    response = requests.get(url)
    if response.status_code == 200:
      with open('resume', "wb") as f:
        f.write(response.content)
    else:
      print(response.status_code)

    resume_text = convertToText("resume")
    jobs = jsonResponse["positions"]
    for job in jobs:
      job['processed_text'] = preprocess_text(job['description'])

    from gensim.models.doc2vec import Doc2Vec, TaggedDocument
    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np


    splitted = []
    for job in jobs:
      splitted = splitted + job['processed_text'].split()

    tagged_docs = [TaggedDocument(words=text.split(), tags=[i]) for i, text in enumerate(splitted)]

    model_job = Doc2Vec(tagged_docs, min_count=0)

    for job in jobs:
      job['vector']= model_job.infer_vector(job['processed_text'].split())

    cleaned_resume_text = cleanResume(resume_text)
    resume_text_vector = model_job.infer_vector(cleaned_resume_text)

    recommended_offers_cos_sim = []

    for job in jobs:
      similarity = cosine_similarity(np.array([resume_text_vector]), np.array([job['vector']]))[0][0]
      if(similarity >= 0.6):
        new_dict = {x:job[x] for x in job if x not in ('vector','processed_text')}
        recommended_offers_cos_sim.append(new_dict)


    return https_fn.Response(json.dumps(recommended_offers_cos_sim))
