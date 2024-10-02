const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoute.js');
const authRouter = require('./routes/authRoute.js');
const listingRouter = require('./routes/listingRoute.js');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app's dist folder
app.use(express.static(path.join(__dirname, '../housify_frontend/dist')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to database successfully'))
.catch((err) => console.log('Database connection error', err));

// Define your API routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Serve the React app for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../housify_frontend/dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start the server
app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
