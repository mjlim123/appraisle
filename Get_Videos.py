from googleapiclient.discovery import build
from PIL import Image
import pprint
import urllib.request
import random
import cv2
import numpy as np
import easyocr

api_key = 'AIzaSyB0jjGAaJ867GAzM6dyog3DggN2vX6vYWg'
tesseract_path = 'C:/Program Files/Tesseract-OCR/tesseract.exe'


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


for i in range(len(videos)):
    video_url = videos[i]['snippet']['resourceId']['videoId']
    thumbnail_url = videos[i]['snippet']['thumbnails']['high']['url']
    urllib.request.urlretrieve(thumbnail_url, "thumbnail.png")

    image = cv2.imread('thumbnail.png')
    # gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    reader = easyocr.Reader(['en'])
    results = reader.readtext(image, detail=0)

    price = ""

    try:
        string = results[0][1:].lower()
        string = string.replace('/', '')
        string = string.replace(' ', '')
        string = string.replace('.','')
        string = string.replace(',','')
        if 'million' in string:
            string = string.replace(' ', '')
            string = string.replace('.','')
            string = string.replace('million', '000000')
            price = int(string)
        else:
            price = int(string)
            with open('GoodVideos.csv', 'r+') as file:
                data = str(price)+','+video_url + '\n'
                contents = file.read()
                if data in contents:
                    print("Already accounted for")
                else:
                    file.write(data)
                    file.close()
    except:
        print("Wrong?")
        print(results)
        with open('ProblemVideos.txt', 'r+') as file:
            contents = file.read()
            if thumbnail_url in contents:
                print("Already accounted for")
                pass
            else:
                file.write(thumbnail_url+'\n')
                file.close()

