'use strict';

const express = require('express'),
    path = require('path');

const app = express();

app.use(express.static('public'));

// /** catch 404 and forward to error handler */
// app.use('*', (req, res) => {
//     return res.status(404).json({
//         success: false,
//         message: 'API endpoint doesnt exist'
//     })
// });

module.exports = app;
