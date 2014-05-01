<?php /* User invites another user to play at the campaign (who becomes a member)
or User shares the campaign with another user (who becomes an owner)
or User changes an owner or blacklisted user's permission to member
or User changes a member or blacklisted user's permission to owner
or User adds a user to the campaign's blacklist
or User removes a user from the campaign's blacklist (NULL permission)
or User revokes a user's ownership or membership (NULL permission)
or User disowns the campaign (NULL permission) */

session_start();
if (!isset($_SESSION['user_id'])) die ('You are not logged in.');

include('db_config.php');
include('include/query.php');
include('include/ownership.php');

// Interpret the Request

$user = $LT_SQL->real_escape_string($_REQUEST['user']);
$campaign = $LT_SQL->real_escape_string($_REQUEST['campaign']);
$permission = $LT_SQL->real_escape_string($_REQUEST['permission']);

// Query the Database

if (LT_can_edit_campaign($campaign))
	LT_call('update_campaign_user_permisssion', $user, $campaign, $permission);

?>