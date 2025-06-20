const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.json({ message: 'API is running!' })
});

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});