<?php // User creates a new piece

include('db_config.php');
include('include/query.php');
include('include/ownership.php');

session_start();
if (!isset($_SESSION['user'])) {
	header('HTTP/1.1 401 Unauthorized', true, 401);
	exit('You are not logged in.');
}

// Interpret the Request

$map = intval($_REQUEST['map']);
$image = $LT_SQL->real_escape_string($_REQUEST['image']);

// Query the Database

if (LT_can_edit_map($map)) {
	if ($rows = LT_call('create_piece', $map, $image)) {
		include('include/json_headers.php');
		echo json_encode(array('id' => intval($rows[0]['id'])));
	}
}

?>