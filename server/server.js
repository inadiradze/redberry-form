const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

async function getToken() {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://bootcamp-2022.devtest.ge/');
  await page.click("body > div > div > form > input.px-10.py-4.rounded.text-white.cursor-pointer");
  const token = await page.$("#token");
  const tkn = await (await token.getProperty("innerText")).jsonValue();
  await browser.close();
  return {tkn};
}

app.use(cors({origin: "*"}));

app.get("/api/token", async (req, res) => {
	res.send(await getToken());
});

app.listen(port);

