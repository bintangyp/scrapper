const puppeteer = require("puppeteer");

scrapping = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const url = "https://shinigami.ws/";

  await page.goto(url);
  // await page.waitForSelector(".lepopup-element span");
  // await page.evaluate(() => {
  //   document.querySelector(".lepopup-element span").click();
  // });
  page.addStyleTag({ path: "inicssyangkitainjectkedalamnya.css" });

  await page.screenshot({ path: "images/shinigami.png", fullPage: true });

  // const data = await page.$$eval(".series-title", (judulKomik) => {
  //   return judulKomik.map((jk) => ({ nama: jk.innerText }));
  // });
  // console.log(data);

  const data = await page.$$eval(
    "body > div.wrap > div > div > section.recommendations > div > div > div.row > div.d-flex",
    (datakomik) => {
      return datakomik.values;
    }
  );

  console.log(data);
  // await browser.close();
};

scrapping();
