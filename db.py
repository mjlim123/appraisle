import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import uuid
import csv

cred = credentials.Certificate('calm-nation-392701-firebase-adminsdk-9qnnj-ff4a29d12a.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


with open('GoodVideos.csv', mode ='r') as file:
   
  # reading the CSV file
  csvFile = csv.reader(file)
 
  # displaying the contents of the CSV file
  for lines in csvFile:
    doc_ref = db.collection('videos').document(str(uuid.uuid1()))
    doc_ref.set({
      'Price':int(lines[0]),
      'urlEmbed':lines[1]
    })