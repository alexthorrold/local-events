<?php
try {
    $con = new PDO('mysql:host=learn-mysql.cms.waikato.ac.nz;dbname=at340','at340','my211946sql');
} catch (PDOException $e) {
    echo 'New Database connection error ' . $e->getMessage();
}
?>