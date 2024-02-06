# HTML Deliverable


## Properly structured HTML

### HTML pages for each component of your application
There are 4 pages: The home page, the habit maker page, the library page, and the about page.

### Proper use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER
I included them on every page, just look for them.

### Links between pages as necessary
At the top of every page there is a navigation area. Click the buttons to navigate between pages.

### Application textual content
Each page has text that explains what to do. (INCOMPLETE)

### Placeholder for 3rd party service calls
In make.html and library.html, search for class="webservice". One page will grab a random inspirational or motivational quote, and the other will display a motivational image.

### Application images
In index.html and about.html, there are static images referring to the book, Atomic Habits. (INCOMPLETE)

### Login placeholder, including user name display
In index.html, make.html, and library.html, search for class="user_name". Users will log in through the homepage. The user's name is displayed when viewing the habit maker page and the habit library page.

### Database data placeholder showing content stored in the database
In library.html search for class="database". The libary will show the data from the database of all the habits that user created.

### WebSocket data placeholder showing where realtime communication will go
In index.html search for class="websocket". The placeholder for the atomic habit tracker currently counts 420 hehe

## Misc. Prerequisites
At least 10 git commits are spread consistently throughout February 5th. In the future, I will spread these commits over several days.
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


