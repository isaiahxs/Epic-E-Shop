from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    Item.query.delete()

    elite_agent = Item(
        item_id='5ab16ae85f957f27504aa4df',
        name='Elite Agent',
        price='Tier 87 (S3)',
        price_icon='vip',
        price_icon_link='https://image.fnbr.co/price/icon_vip.png',
        images={
            "icon":'https://image.fnbr.co/outfit/5ab16ae85f957f27504aa4df/icon.png',
            "gallery":'https://image.fnbr.co/outfit/5ab16ae85f957f27504aa4df/gallery.png',
        },
        rarity='epic',
        type='outfit',
        slug='elite-agent',
        readable_type='Outfit',
        description="Failure is not an option.",
        # could give this battle-pass exclusive seed a specific history, but it would then create an inconsistency with other items fetched where history="false"
        # history={
        #     "occurrences": 1,
        #     "firstSeen": "2018-02-22T00:00:00.000Z",
        #     "lastSeen": "2018-04-30T00:00:00.000Z",
        #     "dates": [
        #         }
        #     ],

        # some items that are battle-pass-exclusive will have a history of false with this API. the problem is that my model is set up to take JSON and not just a boolean, so i'll create an equivalent of `history="false"` in JSON form. then in ItemDetailPage, i can check if item.history is false to then display a specific message
        bundle_set="null",
        banner_text="null",
        history={
        "exclusive": True,
        }
    )

    mj_no_way_home = Item(
        item_id='61bb53b3bd358a192111d97c',
        name='MJ (No Way Home)',
        price='1,500',
        price_icon='vbucks',
        price_icon_link='https://image.fnbr.co/price/icon_vbucks.png',
        images={
            "icon":'https://image.fnbr.co/outfit/61bb53b3bd358a192111d97c/icon.png',
            "featured":'https://image.fnbr.co/outfit/61bb53b3bd358a192111d97c/featured.png',
        },
        rarity='marvel',
        type='outfit',
        slug='mj-no-way-home',
        readable_type='Outfit',
        description="What's up, dorks?",
        bundle_set="null",
        banner_text="null",
        history={
            "occurrences": 30,
            "firstSeen": "2021-12-17T00:00:00.000Z",
            "lastSeen": "2022-12-11T00:00:00.000Z",
            "dates": [
                "2022-12-10T00:00:00.000Z",
                "2022-08-12T00:00:00.000Z",
                "2022-08-11T00:00:00.000Z",
                "2022-08-10T00:00:00.000Z",
                "2022-12-11T00:00:00.000Z",
                "2022-08-09T00:00:00.000Z",
                "2021-12-26T00:00:00.000Z",
                "2021-12-24T00:00:00.000Z",
                "2022-03-08T00:00:00.000Z",
                "2022-08-07T00:00:00.000Z",
                "2021-12-25T00:00:00.000Z",
                "2021-12-27T00:00:00.000Z",
                "2022-03-10T00:00:00.000Z",
                "2021-12-22T00:00:00.000Z",
                "2021-12-17T00:00:00.000Z",
                "2022-03-11T00:00:00.000Z",
                "2022-08-08T00:00:00.000Z",
                "2021-12-19T00:00:00.000Z",
                "2021-12-20T00:00:00.000Z",
                "2022-08-13T00:00:00.000Z",
                "2021-12-21T00:00:00.000Z",
                "2021-12-28T00:00:00.000Z",
                "2021-12-29T00:00:00.000Z",
                "2021-12-30T00:00:00.000Z",
                "2021-12-23T00:00:00.000Z",
                "2022-03-06T00:00:00.000Z",
                "2021-12-18T00:00:00.000Z",
                "2022-03-07T00:00:00.000Z",
                "2022-03-09T00:00:00.000Z",
                "2022-03-12T00:00:00.000Z"
            ]
        }   
    )

    spider_man_2099 = Item(
        item_id='6467a03b03356945427f6068',
        name='Spider-Man 2099',
        price='1,500',
        price_icon='vbucks',
        price_icon_link='https://image.fnbr.co/price/icon_vbucks.png',
        images={
            "icon":'https://image.fnbr.co/outfit/6467a03b03356945427f6068/icon.png',
            "featured":'https://image.fnbr.co/outfit/6467a03b03356945427f6068/featured.png',
        },
        rarity='marvel',
        type='outfit',
        slug='spider-man-2099',
        readable_type='Outfit',
        description="Brilliant geneticist Miguel O'Hara.",
        bundle_set="null",
        banner_text="null",
        history={
            "occurrences": 16,
            "firstSeen": "2023-05-23T00:00:00.000Z",
            "lastSeen": "2023-06-07T00:00:00.000Z",
            "dates": [
                "2023-06-05T00:00:00.000Z",
                "2023-06-06T00:00:00.000Z",
                "2023-06-04T00:00:00.000Z",
                "2023-05-26T00:00:00.000Z",
                "2023-05-24T00:00:00.000Z",
                "2023-05-29T00:00:00.000Z",
                "2023-05-23T00:00:00.000Z",
                "2023-06-02T00:00:00.000Z",
                "2023-05-27T00:00:00.000Z",
                "2023-05-28T00:00:00.000Z",
                "2023-05-30T00:00:00.000Z",
                "2023-05-25T00:00:00.000Z",
                "2023-05-31T00:00:00.000Z",
                "2023-06-07T00:00:00.000Z",
                "2023-06-03T00:00:00.000Z",
                "2023-06-01T00:00:00.000Z"
            ]
        }
    )

    teef = Item(
        item_id='5daedbcebffa742e002c321c',
        name='Teef',
        price='1,500',
        price_icon='vbucks',
        price_icon_link='https://image.fnbr.co/price/icon_vbucks.png',
        images={
            "icon":'https://image.fnbr.co/outfit/5daedbcebffa742e002c321c/icon.png',
            "gallery":'https://image.fnbr.co/outfit/5daedbcebffa742e002c321c/gallery.png',
            "featured":'https://image.fnbr.co/outfit/5daedbcebffa742e002c321c/featured.png',
        },
        rarity='epic',
        type='outfit',
        slug='teef',
        readable_type='Outfit',
        description="Life's chewy when you're born to chomp.",
        bundle_set="null",
        banner_text="null",
        history={
            "occurrences": 15,
            "firstSeen": "2019-10-24T00:00:00.000Z",
            "lastSeen": "2023-04-16T00:00:00.000Z",
            "dates": [
                "2023-04-16T00:00:00.000Z",
                "2023-03-09T00:00:00.000Z",
                "2023-01-14T00:00:00.000Z",
                "2022-09-04T00:00:00.000Z",
                "2021-10-31T00:00:00.000Z",
                "2022-12-08T00:00:00.000Z",
                "2020-10-05T00:00:00.000Z",
                "2022-03-02T00:00:00.000Z",
                "2019-10-24T00:00:00.000Z",
                "2020-10-06T00:00:00.000Z",
                "2020-10-23T00:00:00.000Z",
                "2019-11-01T00:00:00.000Z",
                "2020-10-30T00:00:00.000Z",
                "2020-10-04T00:00:00.000Z",
                "2021-06-25T00:00:00.000Z"
            ]
        }
    )

    items_list = [
        elite_agent, mj_no_way_home, spider_man_2099, teef
    ]

    for item in items_list:
        db.session.add(item)

    db.session.commit()


def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))
        
    db.session.commit()