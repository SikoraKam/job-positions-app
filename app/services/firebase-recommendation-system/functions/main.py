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
def getRecommended(req: https_fn.Request) -> https_fn.Response:
    import json
    jsonResponse = json.loads(req.data.decode('utf-8'))
    url = jsonResponse["resumeUrl"]
    response = requests.get(url)
    if response.status_code == 200:
      with open('resume', "wb") as f:
        f.write(response.content)
    else:
      print(response.status_code)

    text = convertToText("resume")

    doc = nlp(text)

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
