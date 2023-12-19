import requests
import json

# Google Places API key
api_key = "geturowndude"

def get_place_id(shop_name, api_key):
    """
    Get the Google Place ID for a shop.
    """
    base_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    params = {
        "input": shop_name,# + ", Copenhagen",
        "inputtype": "textquery",
        "fields": "place_id",
        "key": api_key,
        "region": "dk"
    }
    response = requests.get(base_url, params=params)
    result = response.json()
    if result['status'] == 'OK' and result['candidates']:
        return result['candidates'][0]['place_id']
    return None

def get_detailed_info(place_id, api_key):
    """
    Get detailed place information using the Google Place ID.
    """
    base_url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        "fields": "name,formatted_address,geometry/location,rating,reviews,opening_hours,website,formatted_phone_number",
        "key": api_key
    }
    response = requests.get(base_url, params=params)
    return response.json()

def update_shop_data(shop_list, api_key, filename="data/shop_data.json"):
    """
    Update the shop data JSON file with new shops, avoiding duplicates.
    """
    # Load existing data
    try:
        with open(filename, "r") as file:
            existing_data = json.load(file)
            existing_ids = set(shop['place_id'] for shop in existing_data)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []
        existing_ids = set()

    # Process each shop
    for shop in shop_list:
        place_id = get_place_id(shop, api_key)
        if place_id and place_id not in existing_ids:
            detailed_info = get_detailed_info(place_id, api_key)
            if detailed_info['status'] == 'OK':
                shop_info = detailed_info['result']
                shop_info['place_id'] = place_id  # Adding place_id for tracking
                existing_data.append(shop_info)
                existing_ids.add(place_id)
            else:
                print(f"Details not found for {shop}")
        else:
            print(f"Shop already in list or not found: {shop}")

    # Write updated data back to file
    with open(filename, "w") as file:
        json.dump(existing_data, file, indent=4)

    return existing_data

# Example usage - you can add new shops here
new_shops = [
    "VESTJYDEN", "YONOBI", "HUSTED VIN", "TAGE ANDERSEN BOUTIQUE OG MUSEUM",
    "NORDIC TREATS", "PICO", "KARAMELLERIET", "KJÆR & SOMMERFELDT",
    "SUMMERBIRD", "NORRLYST DELI", "LA GLACE", "TANTE T", "OSTEKÆLDEREN", "VESTJYDEN",
    "SILLEKNOTTE",
    "HANDCRAFTEDCPH",
    "DEN NORDISKE ØLHANDEL",
    "COOL & COZY",
    "HUSTED VIN",
    "LE GOURMAND",
    "VIN PÅ NØRREBRO",
    "VINTRO",
    "KARAMELLERIET",
    "WILGART",
    "KERAMIKBUTIKKEN RIGMOR ALS",
    "BRDR. DS VINHANDEL",
    "VINBØRSEN",
    "VIN & VERDEN",
    "GUSTAVS BISTRO & BUTIK",
    "HUSTED VIN",
    "WAUW",
    "KARDINAL CHOKOLADE",
    "BUTLER VIN",
    "TOFT VIN",
    "BRODERS",
    "FISH & BEER",
    "GUNNAR MADSEN VINHANDEL",
    "SLAGTER LUND",
    "SLAGTER FRIIS",
    "SLAGTER LARS",
    "Lygten Bazar Slagter",
    "Den lille gode slagter",
    "Slagter steen & ko",
    "slagter jens",
    "Windsor fisk",
    "kodan fisk",
    "oxholm vin",
    "sømunken",
    "valby fisk",
    "dagens fisk",
    "herlev fisk & vildt",
    "fiskehallen odin",
    "kildegårds fiskehal",
    "amager fiskehus",
    "supermarco danmark",
    "salumeria",
    "norcino",
    "gastronomer",
    "gastronomia italia",
    "gils deli",
    "asiatisk minimarked",
    "østens bazar"
]
updated_data = update_shop_data(new_shops, api_key)

# Display updated data
print(updated_data)
