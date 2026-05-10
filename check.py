import os
import re

for f in os.listdir('pages'):
    if not f.endswith('.html'): continue
    with open(os.path.join('pages', f), 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if header is inside main
    if re.search(r'<main[^>]*>.*?<header[^>]*class=\"sticky top-0', content, re.DOTALL):
        print(f'{f} has new header inside main')
        
    # Check if old nav exists
    if re.search(r'<nav[^>]*class=\"[^\"]*sticky top-0', content):
        print(f'{f} has old sticky nav')
