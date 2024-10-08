const db = require('./Database.js'); 

db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => {
        console.error('Unable to connect to the database:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        if (error.parent) {
            console.error('Parent error:', error.parent.message);
        }
        console.error('Full error:', error);
    });

