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

const makeRequest = (body) => {
  return {
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
  }
}

const getResult = async (req) => {
  const requests = []
  results = []
  if (req.body.users) {
    req.body.users.forEach(async user => {
      body = {companyShareId: req.body.companyShareId, boid: user.boid}
      requests.push({body: makeRequest(body), user});
    })
    try {
      const res = await Promise.all(
        requests.map(req => fetch(url, req.body).then(data => data.json()).then(data => {return {result: data, user: req.user}})
        ));

      return res;
    } catch (e) {
      throw Error(e);
    }
  }
}

app.post('/result', async (req, res) => {
  try {
    data = await getResult(req)
    res.json(data)
  } catch (e) {
    res.status(500).send(e)
  }

})

app.listen(5000, () => console.log('server running'))
