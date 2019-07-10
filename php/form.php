<?php
//Credentials
$user = "custom_admin";
$password = "custom_pass1";
$host = "db4free.net";
$dbase = "signupform";
$table = "emails";

// Connection to DB
$dbc= mysqli_connect($host,$user,$password, $dbase)
or die("Unable to connect to database");

// Validation
$email = $_POST['email'];

$email = strtolower(trim($email));

if($email && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    exit('Invalid email address, please go back and try again.');
}

$select = mysqli_query($dbc, "SELECT * FROM `emails` WHERE `email` = '".$_POST['email']."'") or exit(mysqli_error($dbc));
if(mysqli_num_rows($select)) {
    exit('This email address has already been added.');
} else {
    $query= "INSERT INTO $table  ". "VALUES ('$email')";

    mysqli_query ($dbc, $query)
    or die ("Error querying database");

    echo 'Your email address "' . $email . '" has been successfully added to the mailing list.';
}

mysqli_close($dbc);

?>