# ExhibScraper
Scrapes manufacturer info from app.swapcard.com

Uses pupeteer library to scrape info from https://app.swapcard.com/event/arab-health-2023-2/exhibitors/RXZlbnRWaWV3XzQyMTQ2Nw==?filters=RmllbGREZWZpbml0aW9uXzIxMTQzNA%253D%253D%3ARmllbGRWYWx1ZV8xMzY2NDA5Mg%253D%253D

automatically scrolls and gathers an arbitrarily large number of similiar elements with class ".clamp__Clamp-ui__sc-1aq2rfp-0.grid__Name-cmp__sc-li856a-4.giNVyY.bZfjja"
which corresponds to manufacturers names. Uses a for loop to remove in element commas, which would otherwise cause erroneous elements when saved to a .csv file
