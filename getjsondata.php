<?php
require_once 'dbconnect.php';

// Query to acquire some of the information for all events
$query = 'select id, name from events';

// If a specific id has been included as a param, instead gets the full details for only that event
if (isset($_GET['id'])) {
    $query = 'select * from events where id = ' . $_GET['id'];
}

$result = $con->query($query);

$events = array();

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $events[] = $row;
}

echo json_encode($events);
?>