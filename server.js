const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const SCORES_FILE_PATH = 'Score_setter.json';

app.get('/scores', (req, res) => {
  fs.readFile(SCORES_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read scores.' });
    }

    let scores;
    try {
      scores = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: 'Failed to parse scores.' });
    }

    res.json(scores);
  });
});

app.post('/scores', (req, res) => {
  const { score1, score2 } = req.body;
  const scores = { score1, score2 };

  fs.writeFile(SCORES_FILE_PATH, JSON.stringify(scores), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to store scores.' });
    }

    res.sendStatus(200);
  });
});

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
