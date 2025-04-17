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
- **HTML5, CSS3, and JavaScript** for the client-side interface.
- **Word generator API** to fetch words.
- **Dictionary API** to provide hints for words.
- **CSS Grid & Flexbox** for responsive layout.
- **Git & GitHub** for version control and repository hosting.

### Tools
- **Git & GitHub** for version control.    
- **Visual Studio Code** as the development environment.  
- **Live Server Extension** for live preview.  
- **W3C Validators** for HTML/CSS validation.  
- **Chrome DevTools** for responsiveness testing.

## Bug Fixes

### Bug 001 - NavBar Hamburger was overlaying onto main content 
- Bug fix - Used a Z-index of greater than 1 to force NavBar above main content

### Bug 002 - Styles not updating in init game function in line with guesses
- Bug fix - Added conditional checks for classes applied during the onGuess() function

### Bug 003 - Applied style not updating correctly in line with letters
- Bug fix - Addition of an apply list array to check amount of times the style was applied during a guess and introducing conditional checks with this function

### Bug 004 - Grey style not applying to already correct letters - classes staying yellow
- Bug fix - Added conditional checks in each application of style to add or remove redundant classes

### Bug 005 - Recursive inputs happening upon page refresh
- Bug fix - Removed event listener from init game function to outside of the function - so it only runs once per game/guess

## Known Bugs

### Bug 001 - Yellow style applying to letter before a doubly correct letter - eg doodle would display an input of ooooo as [grey][yellow][green][green][grey]
- Bug fix - rework the if statement logic around class checking - currently checks if a class is applied which is causing skips in checks for already applied classes along with global variable assigning correct letters permanently rather than per guess, also causing skips - fix is out of scope due to time constraints of project

## External Code

[Background opacity dimming](https://stackoverflow.com/questions/2503907/placing-an-background-image-with-padding-in-h2-tag)

[Simon Says CI Project](https://github.com/Code-Institute-Solutions/Jest_Testing_Part2)

[Async API function](https://stackoverflow.com/questions/74950445/store-fetch-data-in-variable-to-access-it-later)

[API Data Processing](https://stackoverflow.com/questions/74092112/how-to-pass-api-data-into-a-variable-for-later-use-using-javascript)

[JS 2D Array](https://www.freecodecamp.org/news/javascript-2d-arrays/)

[Regex expression check](https://www.w3resource.com/javascript/form/all-letters-field.php#:~:text=You%20can%20write%20a%20JavaScript,HTML%20form%20contains%20only%20letters.&text=To%20get%20a%20string%20contains,%2F%20which%20allows%20only%20letters.)

