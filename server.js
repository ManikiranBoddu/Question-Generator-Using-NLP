require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const questionRoutes = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 5001; // Updated to match Flask API port (5001)

app.use(cors());
app.use(bodyParser.json());

app.use('/api/questions', questionRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
