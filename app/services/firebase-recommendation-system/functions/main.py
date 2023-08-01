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
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    import json
    jsonResponse = json.loads(req.data.decode('utf-8'))
    print("jsonResponse ---> ", jsonResponse)
    url = jsonResponse["resumeUrl"]
    response = requests.get(url)
    if response.status_code == 200:
      with open('resume', "wb") as f:
        f.write(response.content)
    else:
      print(response.status_code)

    text = convertToText("resume")

    print("Text::::", text)
    doc = nlp(text)
    print("doc ----", doc)

    entities = getEntities(doc)

    req_skills1 = [
        "Javascript", "Html", "React", "Svelte"
    ]

    req_skills2 = [
        "Typescript", "Html", "React",
    ]

    req_skills3 = [
        "Spanish", "Excel"
    ]

    req_skills4 = [
        "Sql", "Selenium", "Angular", "Vue"
    ]
    req_skills_offers = [req_skills1, req_skills2, req_skills3, req_skills4]



    match_skill_counts = []
    for req_skills in req_skills_offers:
      print("SEARCHED SKILLS", req_skills)
      print("ENTITIES SKILLS", entities["SKILLS"])
      unique_skills = set(skill for skill in req_skills if skill in entities["SKILLS"])
      print("unique_skills", unique_skills)

      count = len(unique_skills)
      print("count", count)

      ratio = count / len(req_skills)
      match_skill_counts.append(ratio)

    highest_ratio_index = match_skill_counts.index(max(match_skill_counts))
    print("highest_ratio_index", highest_ratio_index)
    return https_fn.Response(str(highest_ratio_index))
