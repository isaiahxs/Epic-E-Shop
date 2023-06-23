#  contains routes for getting information about items, like getting an item by ID
import os
from flask import Blueprint, jsonify
import requests
import json
from app.models import Item
from app.models import db
item_routes = Blueprint('items', __name__)

# helper we will use to check if item retrieved from API already exists in our database
def item_exists(id):
    return db.session.query(Item.id).filter_by(id=id).scalar() is not None

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
        item_dict = {
            # 'id': item['id'],
            'itemId': item['id'],
            'name': item['name'],
            'price': item['price'],
            'priceIcon': item['priceIcon'],
            'priceIconLink': item['priceIconLink'],
            'images': item['images'],
            'rarity': item['rarity'],
            'type': item['type'],
            'slug': item['slug'],
            'readableType': item['readableType'],
            'description': item['description'],
            'bundleSet': item['bundleSet'],
            'bannerText': item['bannerText'],
            'history': item['history']
        }

        #check if item is in database
        existing_item = Item.query.filter_by(item_id=item['id']).first()

        #if it does not, add it to the database
        if existing_item is None:
            new_item = Item(
                item_id=item['id'],
                name=item['name'],
                price=item['price'],
                price_icon=item['priceIcon'],
                price_icon_link=item['priceIconLink'],
                images=item['images'],
                rarity=item['rarity'],
                type=item['type'],
                slug=item['slug'],
                readable_type=item['readableType'],
                description=item['description'],
                bundle_set=item['bundleSet'],
                banner_text=item['bannerText'],
                history=item['history']
            )
            db.session.add(new_item)

        #adding the dictionary to the result list
        result.append(item_dict)

    #commit changes to database
    db.session.commit()

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
        item_dict = {
            # 'id': item['id'],
            'itemId': item['id'],
            'name': item['name'],
            'price': item['price'],
            'priceIcon': item['priceIcon'],
            'priceIconLink': item['priceIconLink'],
            'images': item['images'],
            'rarity': item['rarity'],
            'type': item['type'],
            'slug': item['slug'],
            'readableType': item['readableType'],
            'description': item['description'],
            'bundleSet': item['bundleSet'],
            'bannerText': item['bannerText'],
            'history': item['history']
        }

        #check if item is in database
        existing_item = Item.query.filter_by(item_id=item['id']).first()

        #if it does not, add it to the database
        if existing_item is None:
            new_item = Item(
                item_id=item['id'],
                name=item['name'],
                price=item['price'],
                price_icon=item['priceIcon'],
                price_icon_link=item['priceIconLink'],
                images=item['images'],
                rarity=item['rarity'],
                type=item['type'],
                slug=item['slug'],
                readable_type=item['readableType'],
                description=item['description'],
                bundle_set=item['bundleSet'],
                banner_text=item['bannerText'],
                history=item['history']
            )
            db.session.add(new_item)

        #adding the dictionary to the result list
        result.append(item_dict)

    #commit changes to database
    db.session.commit()

    #returning the result list as a json object
    return jsonify(result)

@item_routes.route('/<itemId>', methods=['GET'])
def get_item(itemId):
    """
    Get an item based on its itemId
    """
    item = Item.query.filter_by(item_id=itemId).first()
    # item = Item.query.get(itemId)

    if item:
        return item.to_dict()
    else:
        return {'error': 'Item not found'}, 404