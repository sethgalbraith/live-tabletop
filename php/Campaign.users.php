<?php // User views the owners, members and guests of this campaign

include('db_config.php');
include('include/query.php');
include('include/ownership.php');
include('include/output.php');

session_start();
if (!isset($_SESSION['user'])) {
	header('HTTP/1.1 401 Unauthorized', true, 401);
	exit('You are not logged in.');
}

$campaign = intval($_REQUEST['campaign']);
if (LT_can_view_campaign($campaign))
	if (is_array($rows = LT_call('read_campaign_users', $campaign)))
		LT_output_array($rows, array(
			'integer' => array('id', 'avatar'),
			'boolean' => array('viewing'),
			'json' => array('cursor')));
?>
