// Import SCSS
import './scss/styles.scss'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcgk5uQ7BMLD99bom55tqD_MZLQgs254I",
    authDomain: "shez-a5a8d.firebaseapp.com",
    databaseURL: "https://shez-a5a8d.firebaseio.com",
    projectId: "shez-a5a8d",
    storageBucket: "shez-a5a8d.appspot.com",
    messagingSenderId: "195337069678",
    appId: "1:195337069678:web:946ec548706c7d7f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference messages collection
const emailRef = firebase.database().ref();

// Listen for form submit
document.getElementById('newsletter-form').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();

    //Get email value and convert it to lowercase
    const email = getInputVal('newsletter-email').toLowerCase();

    if (validateEmail(email)) {
        // Run saveEmail function
        saveEmail(email);
    } else {
        // Throw an error if the email address entered is invalid
        alert('Error! Please enter a valid email address.')
    }
}

// Function to get form value (Email Address)
function getInputVal(id){
    return document.getElementById(id).value;
}

// Email Validation function
function validateEmail(email) {
    var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(email);
}

// Save email to firebase
function saveEmail(email){

    emailRef.once('value')
        // Return snapshot of the DB
        .then(function(dataSnapshot) {
            // Returns DB entries as collection of objects
            const databaseObj = Object.values(dataSnapshot.val());

            // Filters to the first item in the object (in our case it's users) which returns another
            // set of objects that are our email address key/values (Email: Value).
            // Returns just the value from the object
            const obj = Object.values(databaseObj[0]);

            // Init empty Array
            let arr = [];

            // For each item in our array, add it to our arr variable
            obj.forEach((val) => {
                arr = arr.concat(Object.values(val));
            });

            // If email address is included in our array then throw some sort of error to say it exists.
            if (arr.includes(email)) {
                alert('Error! The Email address already exists in the database.')

            // If it doesn't exist then post value to database
            } else {
                emailRef.child('users').push().set({
                    'email': email,
                });
                alert('Success! Your Email address has been saved!');
            }

            // If the database is empty, it throws an error so within the error catch,
            // add the value to the database
        }).catch(err => {
            emailRef.child('users').push().set({
                'email': email,
            });
            alert('Success! Your Email address has been saved!');
    })

}