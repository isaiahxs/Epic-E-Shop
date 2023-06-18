#  contains routes for getting information about items, like getting an item by ID
import os
from flask import Blueprint, jsonify
import requests
import json

item_routes = Blueprint('items', __name__)

# because of the prefix in app/__init__.py, the full route is '/api/items/daily_items'
# when this route is hit, it will return a JSON response with the daily items from the Fortnite API
@item_routes.route('/daily_items', methods=['GET'])
def get_daily_items():
    url = "https://fnbr.co/api/shop"
    headers = {'x-api-key': os.getenv("API_KEY")}
    response = requests.get(url, headers=headers)
    data = json.loads(response.text)

    daily_items = data['data']['daily']
    result = []

    for item in daily_items:
        name = item['name']
        price = item['price']
        price_icon_link = item['priceIconLink']
        image_link = item['images']['icon']
        description = item['description']

        #creating a dictionary to store each item
        item_dict = {
            'Name': name,
            'Price': price,
            'Image': image_link,
            'Description': description
        }

        #adding the dictionary to the result list
        result.append(item_dict)

    #returning the result list as a json object
    return jsonify(result)