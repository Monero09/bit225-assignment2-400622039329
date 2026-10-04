// Initial predefined array of books (at least 6 as requested)
const initialBooks = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Information Technology', copies: 3 },
    { id: 2, title: 'The Lean Startup', author: 'Eric Ries', category: 'Business Administration', copies: 5 },
    { id: 3, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Cyber Security', copies: 2 },
    { id: 4, title: 'The Art of War', author: 'Sun Tzu', category: 'Mass Communication', copies: 0 },
    { id: 5, title: 'Clean Code', author: 'Robert C. Martin', category: 'Information Technology', copies: 4 },
    { id: 6, title: 'Principles', author: 'Ray Dalio', category: 'Business Administration', copies: 7 }
];

// App State
let books = [...initialBooks];

// DOM Elements Selection
const bookContainer = document.getElementById('bookContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const addBookForm = document.getElementById('addBookForm');
const errorMessage = document.getElementById('errorMessage');

/**
 * Renders the book cards to the DOM.
 * @param {Array} booksToRender - Array of book objects to display.
 */
function renderBooks(booksToRender) {
    // Clear the current list
    bookContainer.innerHTML = '';

    // If no books match the filters, show a friendly message
    if (booksToRender.length === 0) {
        bookContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #666;">No books found matching your criteria.</p>';
        return;
    }

    // Create and append card for each book
    booksToRender.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        
        // Determine button state based on copies
        const isOutOfStock = book.copies === 0;
        const btnText = isOutOfStock ? 'Out of stock' : 'Borrow';
        const disabledAttr = isOutOfStock ? 'disabled' : '';

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <span class="category-badge">${book.category}</span>
            <p class="copies-info">Copies Available: <span id="copies-${book.id}">${book.copies}</span></p>
            <button onclick="borrowBook(${book.id})" id="btn-${book.id}" ${disabledAttr}>${btnText}</button>
        `;
        
        bookContainer.appendChild(card);
    });
}

/**
 * Handles borrowing a book. Reduces copies and updates the UI.
 * @param {number} id - The ID of the book being borrowed.
 */
// eslint-disable-next-line no-unused-vars
function borrowBook(id) {
    const bookIndex = books.findIndex(b => b.id === id);
    
    // Check if book exists and has copies
    if (bookIndex !== -1 && books[bookIndex].copies > 0) {
        books[bookIndex].copies -= 1; // Decrease copies count
        
        // Efficiently update just this specific card in the DOM
        document.getElementById(`copies-${id}`).innerText = books[bookIndex].copies;
        
        // If it just reached 0, disable the button
        if (books[bookIndex].copies === 0) {
            const btn = document.getElementById(`btn-${id}`);
            btn.innerText = 'Out of stock';
            btn.disabled = true;
        }
    }
}

/**
 * Filters the books list by search text (title) and selected category.
 */
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = books.filter(book => {
        // Check if title matches search input
        const matchesSearch = book.title.toLowerCase().includes(searchTerm);
        // Check if category matches selection
        const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    renderBooks(filtered);
}

/**
 * Helper to display error messages on screen.
 * @param {string} msg - The error message to show.
 */
function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = 'block';
    
    // Automatically hide error after 4 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 4000);
}

// Listen for Add Book Form submission
addBookForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page refresh

    // Retrieve and trim inputs
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const category = document.getElementById('category').value;
    const copiesInput = document.getElementById('copies').value;
    const copies = Number(copiesInput);

    // Validation 1: All fields must be filled
    if (!title || !author || !category || copiesInput === '') {
        showError('All fields are required.');
        return;
    }

    // Validation 2: Copies must be a whole number greater than or equal to 0
    if (!Number.isInteger(copies) || copies < 0) {
        showError('Copies available must be a valid whole number (0 or higher).');
        return;
    }

    // Create the new book object
    const newBook = {
        id: Date.now(), // Generate a unique ID using the timestamp
        title,
        author,
        category,
        copies
    };

    // Add to our main array
    books.push(newBook);

    // Clear the form fields
    addBookForm.reset();

    // Re-render based on current filter state
    filterBooks();
});

// Attach event listeners for real-time filtering
searchInput.addEventListener('input', filterBooks);
categoryFilter.addEventListener('change', filterBooks);

// Perform initial render when script loads
renderBooks(books);
