<?php
$servername = "localhost";
$username = "roott";
$password = "roott";
$db = "testdb";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $db);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
//end db connection
//-----------------


$sql = "CREATE TABLE IF NOT EXISTS interaction (
eventTarget VARCHAR(200),
eventTime VARCHAR(200),
eventType VARCHAR(200)
)";

if (!$conn->query($sql) === TRUE) {
    die("table interaction is not create");
}

if (isset($_POST ['events'])) {
    $events = json_decode($_POST['events'], true);
    foreach ($events as $event) {
        $insert_query = "insert into interaction (eventTarget,eventTime,eventType) values ( '{$event['eventTarget']}', '{$event['eventTime']}' ,'{$event['eventType']}')";
        $conn->query($insert_query);
    }
}

if (isset($_GET ['getEvents'])) {
    $sql = "SELECT * FROM interaction";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        $events = array();
        while($row = $result->fetch_assoc()) {
            array_push($events, array($row['eventTarget'], $row['eventTime'], $row['eventType']));
        }
        print_r(json_encode($events));
    }
}

$conn->close();
