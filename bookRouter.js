const express = require('express');
let router = express.Router();

// Declare an empty array for book list
let books = [];

// Create a get method route for get all book list
router.get('/', (req, res) => {
    res.json(books); // Show the books array in json format
});


// Middleware to validate the title and author field
const bookValidationRule = (req, res, next) => {
    const title = req.body.title; // Get the title
    const author = req.body.author; // Get the author
    if (!title || title.trim().length === 0) {
        return res.status(400).json({ error: 'The title field is required' });
    }
    if (!author || author.trim().length === 0) {
        return res.status(400).json({ error: 'The author field is required' });
    }
    next();
};


// Create a post method route for create a book list
router.post('/', bookValidationRule, (req, res) => {
    // Generate  Unique ID
    const uniqueId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
    // Make a book list object
    const book = {
        id: uniqueId,
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate || null,
    };
    books.push(book); // Push the object of book in the books array
    res.json(book); // show the book in response
});

// Create delete method route for delete the book list by id
router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Select the book id that pass in the url
    const index = books.findIndex((book) => book.id === bookId); // find the object index number dependent the id that pass the url
    // Check the id valid or not
    if (index !== -1) {
        // If id is valid then splice the object from the books array
        books.splice(index, 1);
        res.json({message: 'Book successfully deleted'}); // And Show the response message
    } else {
        // if id is not valid then show the error message with status code 404
        res.status(404).json({message: `Book not found by this id ${bookId}`});
    }
});

// Exports the router
module.exports = router;