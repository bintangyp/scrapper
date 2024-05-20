const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Go to the specified website
  await page.goto("https://shinigami.ws", { waitUntil: "networkidle2" });

  // Extract the innerText from elements with class .card-title and .card-detail
  const data = await page.$$eval(".row ", (cards) => {
    return cards.map((card) => {
      const h1 = card.querySelector("h1")?.innerText || "";

      const title = card.querySelector(".series-title")?.innerText || "";
      const linkKomik = card.querySelector(".series-link")?.href || "";
      const coverImages = card.querySelector(".thumb-img")?.src || "";
      return { title, linkKomik, coverImages, h1 };
    });
  });

  // Convert the data to JSON
  const jsonData = JSON.stringify(data, null, 4);

  // Log the JSON data to the console
  console.log(jsonData);

  // Write the JSON data to a file
  fs.writeFileSync("data.json", jsonData);

  // Log success message
  console.log("Data has been written to data.json");

  // Close the browser
  await browser.close();
})();
