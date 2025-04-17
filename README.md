# Overview
KJ Games is aiming to be a simple games website
Consisting of a game per page and being easily expandable

Target Audience:
- People with some free time looking to occupy themselves
- Children with limited access to the internet being allowed to play simple games
- People bored at work / school looking for something to do

# User Experience [UX]

### Design

### First Time Visitor Goals

- As a first time visitor I want to be able to easily understand the functionality of the website
- As a first time visitor I want to be able to immediately understand how to navigate and use the features of the website.
- As a first time visitor I expect the website to display appropriately on all the types of screen I view it on
- As a first time visitor I want to easily be able understand how to use the main features of the website

### Returning Visitor Goals

- As a returning visitor, I want to be able to play the same games again consistently without any bugs
- As a returning visitor, I want to be able to suggest new ideas for games to be implemented.

### Colour Scheme

In order to keep each game consistent and simplistic but also professional and eyecatching. I opted for a neutral green and white contrast for the background and navbar.

The primary colours are `1BB295`, `#FFFFFF` and `#000000`

### Usage
- **Straightforward Navigation**  
  Responsive navbar allows for straightforward navigation on all devices
- **Gameplay**  
  Users can choose between their game of choice and be presented with easily accessible games

## Development Process
1. **Initial Setup:**  
   Set up basic HTML, CSS, and JavaScript files.
2. **Set up of Basic Gameplay containers**  
   Using JS and CSS to dynamicaly manipulate the DOM to present clean gameplay features
3. **API Integration:**  
   Integrated two API's that feed data from one to the other - specifities can be found below
4. **Main Game Logic**  
   Used developer tools and console testing to develop a wordle clone

## Technologies Used

### Languages, API's & Source Control
- **HTML5, CSS3, and JavaScript** for the client-side interface.
- **Word generator API** to fetch words. [API Link](https://random-word-api.herokuapp.com/home)
- **Dictionary API** to provide hints for words. [API Link](https://dictionaryapi.dev)
- **CSS Grid & Flexbox** for responsive layout.
- **Git & GitHub** for version control and repository hosting.

### Tools
- **Git & GitHub** for version control.    
- **Visual Studio Code** as the development environment.  
- **Live Server Extension** for live preview.  
- **W3C Validators** for HTML/CSS validation.
- **JSHint** for JS validation.  
- **Chrome DevTools** for responsiveness testing.
- **Google Fonts** Used for typography across the site.

## Bug Fixes

### Bug 001 - NavBar Hamburger was overlaying onto main content 
- Bug fix - Used a Z-index of greater than 1 to force NavBar above main content 

### Bug 002 - Styles not updating in init game function in line with guesses 
- Bug fix - Added conditional checks for classes applied during the onGuess() function - **[Github Commit Link for Code Changes](https://github.com/Ljkkj7/Milestone2/commit/6aa3b99b220a09d0915aaa29d733f001fc2daccc)**

### Bug 003 - Applied style not updating correctly in line with letters
- Bug fix - Addition of an apply list array to check amount of times the style was applied during a guess and introducing conditional checks with this function - **[Github Commit Link for Code Changes](https://github.com/Ljkkj7/Milestone2/commit/a9ecf94dd60a493503ba9eaaccdd2390d97e95a1)**

### Bug 004 - Grey style not applying to already correct letters - classes staying yellow
- Bug fix - Added conditional checks in each application of style to add or remove redundant classes - **[Github Commit Link for Code Changes](https://github.com/Ljkkj7/Milestone2/commit/6687400bc331242f0cedc8b3c7511421df599e9d)**

### Bug 005 - Recursive inputs happening upon page refresh
- Bug fix - Removed event listener from init game function to outside of the function - so it only runs once per game/guess - **[Github Commit Link for Code Changes](https://github.com/Ljkkj7/Milestone2/commit/ebf052e7f20019762a48282b028e918f3332c883)**

### Bug 006 - Preceeding letter not changing class from yellow if all letters are already correct
- Bug fix - Added conditional check with an apply list array to check the index of letters that have been over applied and removed the corresponding class - **[Github Commit Link for Code Changes](https://github.com/Ljkkj7/Milestone2/commit/78343eea5e3a2c6fa035423730f62d60bac3f771)**

## Validation Results

### W3C HTML Checks

- [Homepage](assets/images/indexHTMLCheck.jpg)
- [Simon Says]()
- [LetterBoxed]()
- [Contact]()
- [404]()

## External Code

[Background opacity dimming](https://stackoverflow.com/questions/2503907/placing-an-background-image-with-padding-in-h2-tag)

[Simon Says CI Project](https://github.com/Code-Institute-Solutions/Jest_Testing_Part2)

[Async API function](https://stackoverflow.com/questions/74950445/store-fetch-data-in-variable-to-access-it-later)

[API Data Processing](https://stackoverflow.com/questions/74092112/how-to-pass-api-data-into-a-variable-for-later-use-using-javascript)

[JS 2D Array](https://www.freecodecamp.org/news/javascript-2d-arrays/)

[Regex expression check](https://www.w3resource.com/javascript/form/all-letters-field.php#:~:text=You%20can%20write%20a%20JavaScript,HTML%20form%20contains%20only%20letters.&text=To%20get%20a%20string%20contains,%2F%20which%20allows%20only%20letters.)

