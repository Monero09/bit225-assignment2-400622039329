# BlueLib Catalogue 📚

**Student Name:** Lesly Ambe  
**Roll Number:** 400622039329  
**Course Assignment:** BIT225 - Assignment 2  

Hey there! Welcome to my submission for the BlueLib Catalogue project. This is a single-page frontend application I built for the BlueCrest College Library so students can easily browse, search, and borrow books online. 

I wanted to make it feel authentic to our school, so I styled the whole interface using BlueCrest College's brand colors (mainly professional blues and clean whites). 

## How it was built 🛠️
I kept things completely vanilla for this assignment. No frameworks, no Bootstrap, no libraries. 
* **HTML5:** Set up using proper semantic tags (`<header>`, `<main>`, `<section>`).
* **CSS3:** I used CSS Variables for the color scheme and CSS Grid to handle the responsive layout. It smoothly transitions from a 3-column layout on desktops down to a single column on phones.
* **Vanilla JS:** All the heavy lifting (filtering, updating the DOM, handling form submissions) is done with plain JavaScript.

## Cool Features ✨
1. **Live Search & Filter:** You don't have to hit "enter" to search. The book list updates instantly as you type a title or change the category dropdown.
2. **Borrow System:** If you click "Borrow" on a book, the available copies go down. Once a book hits 0 copies, the system automatically disables the button and marks it as "Out of stock".
3. **Add Your Own:** There's a fully validated form to add new books to the catalogue without refreshing the page. It checks to make sure you aren't trying to add negative or decimal copies before accepting the entry.

## How to view it
Since this is purely a frontend project with no backend database, you don't need to install anything. Just download the folder, double-click `index.html` to open it in your browser (Chrome/Edge/Firefox), and everything will run perfectly.
