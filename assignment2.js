const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const payload = req.body;
  const str = payload.str;

  const noWords = str.trim().split(/\s+/).length;

  if (noWords >= 8) {
    res.sendStatus(200);
  } else {
    res.sendStatus(406);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
