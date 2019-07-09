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

    //Get email value
    const email = getInputVal('newsletter-email');

    // Save message
    saveMessage(email);
}

// Function to get form value (Email Address)
function getInputVal(id){
    return document.getElementById(id).value;
}

// Save email to firebase
function saveMessage(email){

    emailRef.once('value')
        // Return snapshot of the DB
        .then(function(dataSnapshot) {
            // Returns DB entries as collection of objects
            const lol = Object.values(dataSnapshot.val());

            // Filters to the first item in the object (in our case it's users) which returns another
            // set of objects that are our email address key/values (Email: Value).
            // Returns just the value from the object
            const obj = Object.values(lol[0]);

            // Init empty Array
            let arr = [];

            // For each item in our array, add it to our arr variable
            obj.forEach((val) => {
                arr = arr.concat(Object.values(val));
            });

            // if email address is included in our array then throw some sort of error to say it exists.
            if (arr.includes(email)) {
                console.log('it exists');

            //If it doesn't exist then post value to database
            } else {
                emailRef.child('users').push().set({
                    'email': email,
                });
                alert('Your Email address has been saved!');
            }

            // If the database is empty, it throws an error so within the error catch,
            // add the value to the database
        }).catch(err => {
            console.log(err)

            emailRef.child('users').push().set({
                'email': email,
            });
            alert('Your Email address has been saved!');
    })

}