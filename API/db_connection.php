<?php
$db_conn = mysqli_connect("localhost","root","","usermgmt");


if ($db_conn->connect_error) {
   die("Connection failed: " . $db_conn->connect_error);
}
  