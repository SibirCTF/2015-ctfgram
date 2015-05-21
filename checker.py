#!/usr/bin/python
#  coding=utf-8
__author__ = 'shipko'
import socket
import pyexiv2
import urllib, hashlib, requests, re, random
from sys import argv, exit, stderr
import os

PORT=2205
def check(hostname):
    try:
        response = os.system("ping -c 1 " + hostname + " > /dev/null 2>&1") # -t 3 нужно ли?
        if response != 0:
            print("Host unreachable")
            return 104  

        welcome = urllib2.urlopen("http://" + hostname + ":" + str(PORT)).read()    
        
        if "Welcome" not in welcome:
            print("Welcome message not found")
            return 103

        print("ok")
        return 101
    except:
        print("Port unreachable")
        return 104


def put(hostname, id, flag):
    try:
        response = os.system("ping -c 1 " + hostname + " > /dev/null 2>&1") # -t 3 нужно ли?
        if response != 0:
            print("Host unreachable")
            return 104
        mail = str(id) + "@yandex.ru"
        password = hashlib.md5(str(id) + "verysibirctfhardhardpass")

        r = requests.post('http://' + hostname + ":" + str(PORT)+ "/login", 
            data={ 'mail' : mail, 'password': password.hexdigest() }
            );

        cookie = {'connect.sid': r.cookies['connect.sid']}
        
        # Attach tags in photo
        r = requests.get('http://api-fotki.yandex.ru/api/top/')

        urls = re.findall(r'href="([^"]*_XL)"', r.text)
        url = urls[random.randint(1,len(urls))]

        page = requests.get(url)
        with open('/tmp/image.jpg', 'wb') as test:
            test.write(page.content)


        metadata = pyexiv2.ImageMetadata('/tmp/image.jpg')
        
        metadata.read()

        key = 'Exif.Image.Artist'

        metadata[key] = pyexiv2.ExifTag(key, flag)
    
        metadata.write()



        data = { 'descr': '', 'geo': flag }
        files = { 'photo': ('112.jpg', 
            open('/tmp/image.jpg', 'r'),
            'image/jpeg'
        ) }
        r = requests.post('http://' + hostname + ":" + str(PORT)+ "/add", 
            cookies=cookie,
            data=data,
            files=files
            ); 


        if "added" not in r.text:
            print "Can't add photo"
            return 103


        return 101
   
    except:
        print("Error happend")
        return 102


def get(hostname, id, flag):
    try:
        response = os.system("ping -c 1 " + hostname + " > /dev/null 2>&1") # -t 3 нужно ли?
        if response != 0:
            print("Host unreachable")
            return 104
        
        mail = str(id) + "@yandex.ru"
        password = hashlib.md5(str(id) + "verysibirctfhardhardpass")

        r = requests.post('http://' + hostname + ":" + str(PORT)+ "/login", 
            data={ 'mail' : mail, 'password': password.hexdigest() }
            );

        cookie = {'connect.sid': r.cookies['connect.sid']}

        r = requests.get('http://' + hostname + ":" + str(PORT)+ "/profile", 
            cookies=cookie,
            ); 

        next_url = re.compile(r"photo/[a-z0-9]*").findall(r.text)[0]

        r = requests.get('http://' + hostname + ":" + str(PORT)+ "/" + next_url, 
            cookies=cookie,
            );         

        if flag in r.text:
            print('ok')
            return 101
        else:
            print('not  ok')
            return 102
    except:
        return check(hostname)


if __name__ == '__main__':
    if len(argv) > 1:
        if argv[1] == "check":
            if len(argv) > 2:
                exit(check(argv[2]))
        elif argv[1] == "put":
            if len(argv) > 4:
                exit(put(argv[2], argv[3], argv[4]))
        elif argv[1] == "get":
            if len(argv) > 4:
                exit(get(argv[2], argv[3], argv[4]))
    exit(110)