# Firebase Newsletter Signup Form
This project uses Google Firebase to post to and store the email addresses submitted using the included form.

# Aim
The main aim of this project was to create a newsletter signup form which stores the submitted email address to a database.
Validation must be used to ensure no duplicate or invalid emails can be submitted.

# Firebase
Google Firebase was selected as the main platform to use for this project, Google Firebase was selected as it's free tier is robust and it allows me manipulate the database for this project in real time.

Firebase also has a large community and plenty of documentation available online.

# Preparing the Project
This project makes use of ParcelJS, ParcelJS was selected as it is quick to setup and it allows me to use LiveReload, SCSS and allows me to minify and compile this project.

# JavaScript
JavaScript was used to handle all the logic of this project.

Firebase is initialised at page load. (Credentials are exposed at the moment but will be removed at a later date.)

The form checks whether the email submitted is valid and then connects to the Firebase database to check if the form already exists inside the database, If the email is valid and not a duplicate the form will then post to the database.

Validation - Any email submitted is validated using a regex function, in addition the form is always sent as lowercase in order to prevent case sensitive duplicates.

# HTML
The index.html file is selected as the entry point for ParcelJS.

# SCSS
SCSS is used in this project as it allows for more legible code when working within nested elements.

# Libraries Used
- Google Firebase
- Google Fonts
- ParcelJS
- Normalise CSS
- SCSS

# References
- [Google Firebase Documentation](https://firebase.google.com/docs/reference/js/)
- [Mozilla MDN Web Docs - JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [Validate email address using JavaScript](http://form.guide/best-practices/validate-email-address-using-javascript.html)
