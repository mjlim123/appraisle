from googleapiclient.discovery import build
from PIL import Image
import pprint
import urllib.request
import random
import cv2
import numpy as np
import easyocr
import csv
from pymongo import MongoClient
import json
import torch


def get_videos(videos):
    good_videos = []
    count = 1
    for i in range(len(videos)):
        title = videos[i]['snippet']['title']
        video_id = videos[i]['snippet']['resourceId']['videoId']
        thumbnail_url = videos[i]['snippet']['thumbnails']['high']['url']
        description = videos[i]['snippet']['description']
        urllib.request.urlretrieve(thumbnail_url, "thumbnail.png")
        
        

        image = cv2.imread('thumbnail.png')
        # gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

        reader = easyocr.Reader(['en'], gpu=True)
        results = reader.readtext(image, detail=0, )

        price = ""

        try:
            string = results[0][1:].lower()
            string = string.replace('/', '')
            string = string.replace(' ', '')
            string = string.replace('.','')
            string = string.replace(',','')
            string = string.replace('+','')
            if 'million' in string:
                string = string.replace(' ', '')
                string = string.replace('.','')
                string = string.replace('million', '000000')
                price = int(string)

            price = int(string)
            item = {
                'id' : count,
                'videoID' : video_id,
                'price' : price,
                'description' : description,
                'title' : title,
            }
            good_videos.append(item)
            count += 1
        except:
            pass
            # with open('ProblemVideos.txt', 'r+') as file:
            #     contents = file.read()
            #     if thumbnail_url in contents:
            #         print("Already accounted for")
            #         pass
            #     else:
            #         print(results)
            #         cv2.imshow('problem', image)
            #         cv2.waitKey(0)
            #         file.write(thumbnail_url+'\n')
            #         file.close()
    print(count)
    return good_videos



def fetchYoutube():
    api_key = 'AIzaSyB0jjGAaJ867GAzM6dyog3DggN2vX6vYWg'

    youtube = build('youtube', 'v3', developerKey=api_key)

    request = youtube.channels().list(
            part="contentDetails",
            id="UCHWbZM3BIGgZksvXegx_h3w",
            maxResults=500,
        )

    response = request.execute()
    playlist_id = response['items'][0]['contentDetails']['relatedPlaylists']['uploads']

    next_page_token = None
    videos = []
    bad_videos = []

    while 1:
        response = youtube.playlistItems().list(
            playlistId = playlist_id,
            part = 'snippet',
            maxResults = 50,
            pageToken = next_page_token
        ).execute()

        videos += response['items']
        next_page_token=response.get('nextPageToken')
        if next_page_token is None:
            break

    return videos

def cleanDesc(good_videos):
    for i in range(len(good_videos)):
        desc = good_videos[i]['description'].splitlines()
        for j in range(len(desc)):
            if "Specs:" in desc[j]:
                newDesc = ""
                newDesc+= desc[j] + "\n"
                if "Price" not in desc[j+1]:
                    newDesc+= desc[j+1] + "\n"
                if "Price" not in desc[j+2]:
                    newDesc+= desc[j+2] + "\n"
                if "Price" not in desc[j+3]:
                    newDesc+= desc[j+3] + "\n"
                good_videos[i]['description'] = newDesc
                break
            else:
                good_videos[i]['description'] = ""
        print(good_videos[i])

    return good_videos






def addToDB(listOfObj):
    client = MongoClient('mongodb://localhost:27017')
    db = client['appraisle']
    col = db['videos']

    for item in listOfObj:
        col.insert_one(item)
    

def addField(videos):
    client = MongoClient('mongodb://localhost:27017')
    db = client['appraisle']
    col = db['videos']

    for i in range(len(videos)):
        col.update_one({'id' : videos[i]['id']}, {'$set' : {'title' : videos[i]['title']}})




videos = fetchYoutube()
goodVideos = get_videos(videos)

addField(goodVideos)




# cleaned = cleanDesc(goodVideos)
# addToDB(cleaned)

# for i in range(len(test)):
#     if "Specs:" in test[i]:
#         newDesc+= test[i]
#         newDesc+= test[i+1]
#         newDesc+= test[i+2]
#         newDesc+= test[i+3]
#         goodVideos[1]['description'] = newDesc
#         break

# print(goodVideos[1])





# videos = fetchYoutube()
# good_videos = get_videos(videos)


# for i in range(len(videos)):
#     obj = {
#         'id' : i,
#         'videoID' : videos[i]['snippet']['resourceId']['videoId'],
#         'description' : videos[i]['snippet']['description'],
#     }

        
#     listOfObj.append(obj)

# item = listOfObj[0]

# desc = item['description'].splitlines()
    


# for item in listOfObj:
#     with open('description.txt', 'a+', encoding='utf-8') as f:
#         f.write(item)
#         f.close()


