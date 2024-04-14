# Login Deliverable
Application authentication and authorization

## 20% - Supports new user registration
In index.js (the backend file) look for this endpoint: apiRouter.get('/is_login_correct'... This endpoint handles the case when new username is used.

## 20% - Supports existing user authentication
In index.js (the backend file) look for this endpoint: apiRouter.get('/is_login_correct'... This endpoint handles the case when an existing username is used.

## 20% - Stores application data in MongoDB
INCOMPLETE: when a habit is submitted, store it in the database. Also update the global counter properly in the database.

## 20% - Stores and retrieves credentials in MongoDB
In index.js (the backend file) look for this endpoint: apiRouter.get('/is_login_correct'... This endpoint retrieves the profile credentials from the database using "DB.get_profile(attempted_name);"  It also stores new credentials for a new profile using "DB.insert_new_profile(new_profile);". Note that in database.js, the insert_new_profile() method converts the password from plain text to hashed.

## 20% - Restricts application functionality based upon authentication
The only way to navigate to the other pages from index.html is through the login button. The login button will only change to make.html if there is a new name used or the correct login credentials were used.

## Misc. Prerequisites
### Prerequisite: Simon JavaScript deployed to your production environment
(INCOMPLETE)

### Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
See bottom of every page.

### Prerequisite:Git repository README.md file
Ya lookin' at it mate.

### Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
\\(^v^)/


#
# ---------------------Past Deliverables--------------------


# Service Deliverable
Backend web service support and interaction
## 40% - Create an HTTP service using Node.js and Express
In the backend, see the section with the dividing comment: // ------setting up express------ <br/>
Also see the comment: ----start listening for requests----

## 10% - Frontend served up using Express static middleware
In the backend, see the comment: // Serve up the front-end static content hosting

## 10% - Your frontend calls third party service endpoints
In make.js, see display_quote(). I fetch a wise quote from a 3rd party service and display it in bold above the habit input boxes.

## 20% - Your backend provides service endpoints
In the backend, see the section with the dividing comment: //-----------endpoints (aka routes)--------------------

## 20% - Your frontend calls your service endpoints
In index.js, make.js, and library.js, you can find the frontend helper functions for calling  the service endpoints. See the comment: //-------Backend helper functions------------- in each file. These functions are called within the following methods: index.js: login(), display_habit_counter() || make.js: make_habit() ||  || library.js: display_library()


## Misc. Prerequisites
### Prerequisite: Simon JavaScript deployed to your production environment
See simon.habitmaker.click

### Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
See bottom of every page.

### Prerequisite:Git repository README.md file
Ya lookin' at it mate.

### Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
\(^v^)/




# Javascript Deliverable
## 20% JavaScript support for future login.
See "index.js". The login function supports creating user profiles that can be reaccessed with the correct login info.

## 20% JavaScript support for future database data.
Each profile stores the user's name, password, and a list of submitted habits. These profiles will be stored in the database later on so that users can log in on any device and continue submitting more habits upon the ones they already created on a different device. When a new profile is created (see index.js), or when a new habit is submitted (see make.js), this data is updated in localStorage.

## 20% JavaScript support for future WebSocket.
The display of the websocket is on the homepage. The habit counter increments on a loop, simulating other users submitting their habits and showing the live counter on your computer.

## 40% JavaScript support for your application's interaction logic.
After the user logs in, the user can now submit habits. Every habit they submit can be viewed as a list the habit library page. Each new habit submitted (no matter which profile it was created on) updates the "Global Habits Made" counter.

## Misc. Prerequisites
### Prerequisite: Simon JavaScript deployed to your production environment
See simon.habitmaker.click

### Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
See bottom of every page.

### Prerequisite:Git repository README.md file
You're lookin' at it.

### Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
You betcha.



# CSS Deliverable
## Properly styled CSS

### 30% Header, footer, and main content body
See main.css, there is styling for the header, footer, and main that applies to all pages. The header and footer are colored with a light turquoise, while main has a light brown. The footer is intentionally anchored to the bottom for consistency.

### 20% Navigation elements
The navigation Elements have been styled with grey buttons with bold font. They change a slightly darker color when hovered over. Also the links at the bottom are styled differently because they go to different websites. The login button is similarly styled to the header navigation buttons because it also navigates the website.

### 10% Responsive to window resizing
See main.css, the responsive window resizing applies to all pages. The header and footer remain stable, while the main element changes dynamically. Specifically, the navigation buttons are organized vertically when the width is too small. Also, the footer disappears when the height is too small. Also, any change in screen size will change the image sizes.

### 20% Application elements
I styled the counter on the home page to better present and bring focus to it. I also rounded the images to bring a softer feel to the pages. I also set up custom button and input styling to fit the feel of my website.

### 10% Application text content
The font family for all text content has been changed to a modern and appealing font, and increased to a slightly larger size for easier readability. The text is organized in easy-to-read blocks that are centered horizontally on the page.

### 10% Application images
All images are set to 50% width and height of the parent element. Since the parent size dynamically changes, so do the images. As noted earlier, the image corners are rounded for a softer feel.

## Misc. Prerequisites
### Prerequisite: Simon CSS deployed to your production environment
simon.habitmaker.click

### Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
See bottom of every page.

### Prerequisite:Git repository README.md file
You're lookin at it.

### Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
Check.



# HTML Deliverable

## Properly structured HTML

### HTML pages for each component of your application
There are 4 pages: The home page, the habit maker page, the library page, and the about page.

### Proper use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER
I included them on every page, just look for them.

### Links between pages as necessary
At the top of every page there is a navigation area. Click the buttons to navigate between pages.

### Application textual content
Each page has text that explains what to do.

### Placeholder for 3rd party service calls
In make.html and library.html, search for class="webservice". One page will grab a random inspirational or motivational quote, and the other will display a motivational image.

### Application images
In index.html and about.html, there are static images referring to the book, Atomic Habits.

### Login placeholder, including user name display
In index.html, make.html, and library.html, search for class="user_name". Users will log in through the homepage. The user's name is displayed when viewing the habit maker page and the habit library page.

### Database data placeholder showing content stored in the database
In library.html search for class="database". The libary will show the data from the database of all the habits that user created.

### WebSocket data placeholder showing where realtime communication will go
In index.html search for class="websocket". The placeholder for the atomic habit tracker currently counts 420 hehe

## Misc. Prerequisites
At least 10 git commits are spread consistently throughout February 5th. For future deliverables, I will spread these commits over several days.
I have included the github link on my startup's homepage, and obviously I've updated the README.md file.




# Startup Description: Atomic Habit Maker
Ever wanted to become something more, to be someone better? To start now, just create atomic habits! That's where my startup comes in. It helps aces and amateurs create these small and simple habits in the snap of a finger.

## Key Features
### Personal Data
Your privacy matters, so your atomic habits are just for you (but it wouldn't hurt if you share them with your friends :D)

### Atomic Habit Maker
This is the main feature of the startup. It gives the user an easy format to create atomic habits.

### Beginner's Guide
Confused on what atomic habits are? Can't think of any ideas? Don't sweat it, because it will include a simple guide to get you started.

### Browse your Habit Library
As you submit atomic habits, it will save your atomic habits so you can "make it obvious" in your life!

### Atomic Counter
This global counter shows how many atomic habits all users have collectively created! The power of small and simple things, eh?

## Application Sketch
![Sketch of my application. Top note is homepage. Bottom page is default page after login. Can navigate to left and right pages.]

## Technologies
### HTML
I will use HTML to add structure to my startup as the framework for the visual and interactive components of the pages.
### CSS
I will use CSS to add style to my startup as the decoration and visually pleasing aspects of the pages so the user can have a pleasurable experience creating atomic habits.
### Javascript
I will use Javascript to add functionality and interactive elements to my startup to enable users to navigate between pages and brainstorm their atomic habits.
### Web Services
I will use a web service to find a random photo from a collection of motivating images, and also another web service to find random motivational quotes. I will post both of these items on the top of each page on the website.
### Authentication
I will have users log in with appropriate login info so that they can privately save and view the atomic habits they submitted.
### Database persistence
I will store the atomic habits that users submit into a database so to protect this data from being lost on the client's browser or the server.
### WebSocket
Whenever someone submits a new atomic habit, I will update the global counter for the total amount of atomic habits created. Then I will live-sync this with any open instances of the website.


