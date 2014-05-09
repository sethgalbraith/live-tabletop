<?php // User sends or accepts a friend request

include('db_config.php');
include('include/query.php');

session_start();
if (!isset($_SESSION['user_id'])) {
	header('HTTP/1.1 401 Unauthorized', true, 401);
	exit('You are not logged in.');
}

// Interpret the Request

$sender = $LT_SQL->real_escape_string($_SESSION['user_id']);
$recipient = $LT_SQL->real_escape_string($_REQUEST['recipient']);

// Query the Database

LT_call('create_friend', $sender, $recipient);

?>
