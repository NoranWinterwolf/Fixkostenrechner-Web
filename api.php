<?php
$servername = "localhost";
$username = "fix_admin";
$password = "test123";
$dbname = "matthias_fixkostenrechner";

///////////////////////////// connect to database //////////////////

$GLOBALS['connection'] = new mysqli($servername, $username, $password, $dbname);
$GLOBALS['data'] = json_decode($_REQUEST["data"]);

if ($GLOBALS['connection']->connect_error)
    die("Connection failed: ".$GLOBALS['connection']->connect_error);
// Every call to the api needs a purpose. The purpose comes from the
// bash-api.js
if(isset($_REQUEST['purpose'])) {
    switch ($_REQUEST['purpose']) {
        case "Login":
            login();
        break;
        case "getPersons":
            getPersons();
        break;
        case "getIncomes":
            getIncomes();
        break;
        case "getOutgoings":
            getOutgoings();
    }
}
////////////////////////////// connection END ////////////////////

////////////////////////////// LOGIN /////////////////////////////
function login() {
    $query = "SELECT * FROM users WHERE user = '" . $GLOBALS['data']->username . "' AND password = '" . sha1($GLOBALS['data']->password) . "'";
    $user = $GLOBALS['connection']->query($query);
    if($user->num_rows > 0)
        die(json_encode($user->fetch_assoc()));
    else
        die("noMatch");
}

///////////////////////////////// PERSONS ///////////////////////////////
function getPersons() {
    $query =    "SELECT persons.*, 
                (SELECT SUM(incomes.value) FROM incomes WHERE incomes.personId = persons.personId) incomeSum, 
                (SELECT SUM(outgoings.value) FROM outgoings WHERE outgoings.personId = persons.personId) outgoingSum 
                FROM persons 
                WHERE personRef = '" . $GLOBALS['data']->userID . "'";
    $persons = $GLOBALS['connection']->query($query);
    if ($persons->num_rows > 0){
        for ($i = 0; $i < $persons->num_rows; $i++){
            $personData[$i] = $persons->fetch_assoc();
        }
        die(json_encode($personData));
    }
    else
        die("noMatch");
}

///////////////////////////////// INCOMES ///////////////////////////////

function getIncomes() {
    $query =    "SELECT incomes.*
                 FROM incomes
                 WHERE personId = '" . $GLOBALS['data']->personID . "'";
    $incomes = $GLOBALS['connection']->query($query);
    if($incomes->num_rows > 0){
        for($i = 0; $i < $incomes->num_rows; $i++){
            $incomesData[$i] = $incomes->fetch_assoc();
        }
        die(json_encode($incomesData));
    } else
        die("noData");
}

///////////////////////////////// OUTGOINGS ///////////////////////////////

function getOutgoings() {
    $query =    "SELECT outgoings.*
                 FROM outgoings
                 WHERE personId = '" . $GLOBALS['data']->personID . "'";
    $outgoings = $GLOBALS['connection']->query($query);
    if($outgoings->num_rows > 0){
        for($i = 0; $i < $outgoings->num_rows; $i++){
            $outgoingData[$i] = $outgoings->fetch_assoc();
        }
        die(json_encode($outgoingData));
    } else
        die("noData");
}