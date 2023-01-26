const fs = require('fs');
const puppeteer = require('puppeteer');

function extractItems() {
 
    const extractedElements = document.querySelectorAll('.clamp__Clamp-ui__sc-1aq2rfp-0.grid__Name-cmp__sc-li856a-4.giNVyY.bZfjja');
    const items = [];
    for (let element of extractedElements) {
      items.push(element.innerText);
    }
    return items;
  }





  async function scrapeItems(
    page,
    extractItems,
    itemCount,
    scrollDelay = 800,
  ) {
    let items = [];
    try {
      let previousHeight;
      while (items.length < itemCount) {
        items = await page.evaluate(extractItems);
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await page.waitForTimeout(scrollDelay);
      }
    } catch(e) { }
    return items;
  }
  
  (async () => {
    
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });
  
    
    await page.goto('https://app.swapcard.com/event/arab-health-2023-2/exhibitors/RXZlbnRWaWV3XzQyMTQ2Nw==?filters=RmllbGREZWZpbml0aW9uXzIxMTQzNA%253D%253D%3ARmllbGRWYWx1ZV8xMzY2NDA5Mg%253D%253D');
  
    
    const items = await scrapeItems(page, extractItems, 10000);
  
    for(let i = 0; i < items.length; i++) {
      if (items[i].includes(", ")) {
        items[i] = items[i].replace(',', " ");
      }
    }
    
    fs.writeFileSync('./items.csv', items.toString());
  
    
    await browser.close();
  })();