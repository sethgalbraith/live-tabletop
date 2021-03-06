<?php // User paints or erases tiles, fog or walls

include('db_config.php');
include('include/query.php');
include('include/ownership.php');

session_start();
if (!isset($_SESSION['user'])) {
	header('HTTP/1.1 401 Unauthorized', true, 401);
	exit('You are not logged in.');
}

$base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// Interpret the Request

$map = intval($_REQUEST['map']);
$x = intval($_REQUEST['x']);
$y = intval($_REQUEST['y']);
$tile = intval($_REQUEST['tile']);

// Query the Database

if (LT_can_edit_map($map)) {
	$LT_SQL->autocommit(FALSE); /* avoid canceling simultaneous edits */
	if ($rows = LT_call('read_map_tiles', $map)) {
		$width = intval($rows[0]['columns']);
		$height = intval($rows[0]['rows']);
		if ($x >= 0 && $x < $width && $y >= 0 && $y < $height) {
			$tiles = substr_replace($rows[0]['tiles'],
				$base64[$tile / 64 % 64] . $base64[$tile % 64],
				($x + $y * $width) * 2, 2);
			if (is_array(LT_call('update_map_tiles', $map, $tiles)))
				$LT_SQL->commit();
		}
	}
}

?>
