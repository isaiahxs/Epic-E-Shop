#  contains routes for getting information about items, like getting an item by ID
import os
from flask import Blueprint, jsonify
import requests
import json
from app.models import Item

item_routes = Blueprint('items', __name__)

@item_routes.route('/seed_items', methods=['GET'])
def seeded_items():
    """
    Query for seeded items and return them in  a list of dictionaries
    """
    items = Item.query.all()
    return {'seeded_items': [item.to_dict() for item in items]}

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
        id = item['id']
        name = item['name']
        price = item['price']
        price_icon = item['priceIcon']
        price_icon_link = item['priceIconLink']
        # image_link = item['images']['icon']
        images = item['images']
        rarity = item['rarity']
        type = item['type']
        slug = item['slug']
        readable_type = item['readableType']
        description = item['description']
        bundleSet = item['bundleSet']
        bannerText = item['bannerText']
        history = item['history']

        #creating a dictionary to store each item
        item_dict = {
            'id': id,
            'name': name,
            'price': price,
            'priceIcon': price_icon,
            'priceIconLink': price_icon_link,
            # 'Image': image_link,
            'images': images,
            'rarity': rarity,
            'type': type,
            'slug': slug,
            'readableType': readable_type,
            'description': description,
            'bundleSet': bundleSet,
            'bannerText': bannerText,
            'history': history
        }

        #adding the dictionary to the result list
        result.append(item_dict)

    #returning the result list as a json object
    return jsonify(result)

@item_routes.route('/featured_items', methods=['GET'])
def get_featured_items():
    url = "https://fnbr.co/api/shop"
    headers = {'x-api-key': os.getenv("API_KEY")}
    response = requests.get(url, headers=headers)
    data = json.loads(response.text)

    featured_items = data['data']['featured']
    result = []

    for item in featured_items:
        id = item['id']
        name = item['name']
        price = item['price']
        price_icon = item['priceIcon']
        price_icon_link = item['priceIconLink']
        # image_link = item['images']['icon']
        images = item['images']
        rarity = item['rarity']
        type = item['type']
        slug = item['slug']
        readable_type = item['readableType']
        description = item['description']
        bundleSet = item['bundleSet']
        bannerText = item['bannerText']
        history = item['history']

        #creating a dictionary to store each item
        item_dict = {
            'id': id,
            'name': name,
            'price': price,
            'priceIcon': price_icon,
            'priceIconLink': price_icon_link,
            # 'Image': image_link,
            'images': images,
            'rarity': rarity,
            'type': type,
            'slug': slug,
            'readableType': readable_type,
            'description': description,
            'bundleSet': bundleSet,
            'bannerText': bannerText,
            'history': history
        }

        #adding the dictionary to the result list
        result.append(item_dict)

    #returning the result list as a json object
    return jsonify(result)