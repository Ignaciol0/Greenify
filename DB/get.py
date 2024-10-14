import requests

# URL of the API
url = "https://www.ener2crowd.com/it/progetti/api_getProjects?language=en&projectsType=lending&_=1728916410114"

# Send the GET request
api_response = requests.get(url)
projects = {}

# Check if the request was successful
if api_response.status_code == 200:
    api_data = api_response.json()
    for index, data in enumerate(api_data["results"]["Projects"], start=1):
        # URL of the image
        image_url = f"https://www.ener2crowd.com/en/immagini/progetti/piccola/{data['ImageUrl']}"
        
        # Send a GET request to fetch the image
        image_response = requests.get(image_url)

        # Check if the request was successful
        if image_response.status_code == 200:
            # Save the image to a file
            with open(f'project {index}.png', 'wb') as file:
                file.write(image_response.content)
            print(f"Image for Project {index} downloaded successfully!")
        else:
            print(f"Failed to fetch image for Project {index}. Status code: {image_response.status_code}")

        projects[f"Project {index}"] = {
            "title": data["ShortDescription"],
            "description": data["Category"],
            "investors": data["InvestorsNumber"],
            "duration": f"{data['Duration']} months",
            "annualReturn": f"{data['Performance']} %",
            "imageUrl": f'project {index}.png'
        }

else:
    print(f"Failed to fetch data. Status code: {api_response.status_code}")

print(projects)
