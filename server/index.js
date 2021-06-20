const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const url = "https://iporesult.cdsc.com.np/result/result/check";
const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.get("/", (_req, res) => {
  res.json("Ready")
})

const getResult = async (req) => {
  return new Promise((resolve, reject) => {

    bodies = []
    results = []
    if (req.body.users) {
      req.body.users.forEach(async user => {
        bodies.push({companyShareId: req.body.companyShareId, boid: user.boid})
        body = {companyShareId: req.body.companyShareId, boid: user.boid}
        fetch(url, {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": "null",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1"
          },
          "referrer": "https://iporesult.cdsc.com.np/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": `${JSON.stringify(body)}`,
          "method": "POST",
          "mode": "cors"
        }).then(data => data.json()).then(data => results.unshift(user, data));
      })
    }
    resolve(results)
  })

}

app.post('/result', async (req, res) => {
  data = await getResult(req)
  console.log(data)

  // res.send(data)
})

app.listen(5000, () => console.log('server running'))
