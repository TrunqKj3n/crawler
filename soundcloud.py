from tracemalloc import reset_peak
import requests
import json
import pygame
from colorama import Fore
from colorama import Style
url = input("Vui lòng nhập URL cần tải: ")
link = "https://www.klickaud.co/download.php"
res = requests.post(link, data={
    "value": url
})
getUrl = res.text.split('onclick="downloadFile(')[1].split(';')[
    0].split(',')[0].replace("'", "")
# save audio
res1 = requests.get(getUrl)
with open("audio.mp3", "wb") as f:
    f.write(res1.content)
print(Fore.GREEN + "Tải xuống thành công!")
print(Style.RESET_ALL)
reset_peak()
# play audio
pygame.init()
pygame.mixer.init()
pygame.mixer.music.load("audio.mp3")
pygame.mixer.music.play()
while pygame.mixer.music.get_busy():
    pygame.time.Clock().tick(10)
pygame.mixer.music.stop()
pygame.quit()
pygame.mixer.quit()
pygame.display.quit()
pygame.quit()
print(Fore.GREEN + "Xong!")
print(Style.RESET_ALL)
# delete audio
import os
os.remove("audio.mp3")
print(Fore.GREEN + "Xóa thành công!")
print(Style.RESET_ALL)
