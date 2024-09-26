import requests
import xml.etree.ElementTree as ET

def summarize_last_10_articles():
    url = "https://export.arxiv.org/api/query?search_query=cat:cs.AI&start=0&max_results=10"
    response = requests.get(url)
    
    if response.status_code != 200:
        return "Failed to retrieve articles."

    root = ET.fromstring(response.content)
    articles = []

    for entry in root.findall('{http://www.w3.org/2005/Atom}entry'):
        title = entry.find('{http://www.w3.org/2005/Atom}title').text.strip()
        abstract = entry.find('{http://www.w3.org/2005/Atom}summary').text.strip()
        articles.append({'title': title, 'abstract': abstract})

    # Create a summary string
    summary = "Here are the latest 10 articles in AI:\n\n"
    for i, article in enumerate(articles, start=1):
        summary += f"{i}. **{article['title']}**\n   {article['abstract']}\n\n"

    return summary

# Assuming you have a text-content variable
text-content = ""  # This should hold the existing content
text-content += summarize_last_10_articles()

# Example usage
if __name__ == "__main__":
    print(text-content)  # This will show the updated content
