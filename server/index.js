/**
 * Simple Express server to receive Velt webhooks (example).
 * Run: node server/index.js
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/webhooks/velt/comments', (req, res) => {
  console.log('Received Velt webhook:', req.body);
  // TODO: validate signature, handle actionType, enqueue emails, etc.
  res.json({ ok: true });
});

app.listen(4000, ()=>{ console.log('Webhook server running on http://localhost:4000'); });
