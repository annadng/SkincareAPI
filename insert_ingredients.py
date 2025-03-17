import psycopg2
import os
from dotenv import load_dotenv

load_dotenv("passwords.env")
get_password = os.getenv("PASSWORD")

# Connect to PostgreSQL database

connection = psycopg2.connect(
    dbname = "skincare_database",
    user = "annadng",
    password = get_password,
    host = "skincare-database.cr4eao4gak6u.ap-southeast-2.rds.amazonaws.com",
    port = "5432"
)

# Create cursor to execute sql commands

cursor = connection.cursor()

# Define product and its ingredients
product_id = 3
ingredients_string = "Snail Secretion Filtrate, Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Hyaluronate, Panthenol, Arginine, Allantoin, Ethyl Hexanediol, Sodium Polyacrylate, Carbomer, Phenoxyethanol"
ingredients = ingredients_string.split(", ")

for ingredient in ingredients:
    # Check if ingredient exists
    cursor.execute("SELECT id FROM ingredients WHERE name = %s", (ingredient,))
    # Fetch one row from the query result
    result = cursor.fetchone()

    if not result:
        # Insert ingredient into ingredients table
        cursor.execute("INSERT INTO ingredients (name) VALUES (%s) RETURNING id", (ingredient,))
        ingredient_id = cursor.fetchone()[0]
    else:
        ingredient_id = result[0]
    
    # Link ingredient to product
    cursor.execute("INSERT INTO products_ingredients (product_id, ingredient_id) VALUES (%s, %s) ON CONFLICT DO NOTHING", (product_id, ingredient_id))

# Commit queries
connection.commit()

# Close connection
cursor.close()
connection.close()