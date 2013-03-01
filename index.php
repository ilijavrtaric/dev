<?php
session_start();
$version = "20130227";

$timestamp = filemtime(__FILE__);
$timestamp > 0 ? $modified = $timestamp : $modified = 0 ;
$gmt_modified = gmdate('r', $timestamp);

header('ETag: "'.md5($timestamp.__FILE__).'"');
$offset = 60 * 60 * 24; // Cache for 1 day
header('Expires: ' . gmdate ("D, d M Y H:i:s", time() + $offset) . ' GMT');
header('Cache-Control: public');
header('Pragma: no-cache');

if ( isset( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) || isset( $_SERVER['HTTP_IF_NONE_MATCH'] ) ) {
	if ($_SERVER['HTTP_IF_MODIFIED_SINCE'] >= $gmt_modified || str_replace('"', '', stripslashes($_SERVER['HTTP_IF_NONE_MATCH'])) == md5($timestamp.__FILE__)) {
		header($_SERVER['SERVER_PROTOCOL'] . ' 304 Not Modified');
		header('Cache-Control:');
		exit();
	}
} else {
	header('Cache-Control: max-age=' . $offset);
	header('Last-Modified: '.$gmt_modified);
}

//include_once('inc/class.lib.php');
include_once('inc/log.lib.php');
include_once('inc/db.lib.php');

?>
<!DOCTYPE html>
<html>
    <head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta http-equiv='Page-Enter' content='RevealTrans(Duration=2.0,Transition=2)'>
        <meta http-equiv='Page-Exit' content='RevealTrans(Duration=3.0,Transition=12)'>
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="480">
		<meta http-equiv="cleartype" content="on">
		<meta http-equiv="Cache-control" content="private">
		<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1,maximum-scale=1.0">
		<meta http-equiv="imagetoolbar" content="false">
		<meta name="version" content="<?php echo $version; ?>">
		<meta name="copyright" content="Copyright 2012 Christopher D Langton">
		<meta name="distribution" content="IU">
		<meta name="revisit-after" content="1 days">
		<meta name="language" content="EN">
		<meta name="no-email-collection" content="http://www.unspam.com/noemailcollection">
        <title>Test</title>
        <meta name="description" content="">
		<meta name="abstract" content="">
		<meta name="keywords" content="">
		<meta name="contact" content="chris@codewiz.com">
		<meta name="reply-to" content="chris@codewiz.com">
		<meta name="web_author" content="Christopher D. Langton">
		<meta name="image_src" content="">
		<link rel="canonical" href="" />
        <link rel="stylesheet" href="css/<?php echo basename(__FILE__, '.php'); ?>.css?v=<?php echo $version; ?>">
		<link rel="shortcut icon" href="favicon.ico">
		<link rel="icon" href="favicon.ico" type="image/x-icon">
		<link rel="author" href="https://plus.google.com/u/0/108887414317459154833">
    </head>
    <body>
    <!--[if lt IE 7]>
        <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->
<?php
	//create a nonce for forms 
	$_SESSION['nonce'] = mt_rand();
	echo '<div id="nonce" class="hide">'.$_SESSION['nonce'].'</div>';	
	//$nonce = hash( 'sha256' , $_SESSION['nonce'] );
?>
    <div id="ajaxload" class="hide"><img src="./img/ajax-loader.gif"/></div> <!-- #ajaxload -->
    <div id="messages" class="hide"></div> <!-- #messages -->
    <div id="browser-width" class="hide"></div> <!-- #browser-width -->
        
        <div>
        <!-- content area -->
        </div>
        
    <hr>
    <footer>
        <p>&copy; Christopher D. Langton 2013</p>
    </footer>
<?php
$db = new db( 'db' ) ;

/* 
// prepare a new user record
$newuser['username'] = 'chrisdlangton' ;
$newuser['email'] = 'chris@codewiz.biz' ;
$newuser['active'] = true ;
//or
$newuser = array(
            'username' => 'chrisdlangton'
            ,'email' => 'chris@codewiz.biz'
            ,'active' => true
            ) ;
// insert a new user (will also create the 'table')
$db->insert( 'users' , $newuser ) ;

// query all records in 'table'
$db->select( 'users' )->get() ;

// query all records in 'table' that have a 'column' matching x but the value of column x may be anything as long as column x exists
$db->select( 'users' , 'email' )->get() ;

// query all records in 'table' that have a 'column' with values matching an array of columns and values.
$db->select( 'users', array( 'username'=>'chrisdlangton' , 'active'=>true , 'email'=>'chris@codewiz.biz' ) )->get() ;

// prepare an update, use get() to view the results of the select
$db->select( 'users' , 'email' )->update( array( 'username'=>'testing' ) )->get() ;

// prepare an update, use get( 'update' ) to view the results of the update before committing
$db->select( 'users' , 'email' )->update( array( 'username'=>'testing' ) )->get( 'update' ) ;

// prepare an update, use commit() to commit the changes to the db
$db->select( 'users' , 'email' )->update( array( 'username'=>'testing' ) )->commit() ;
// or
$db->select( 'users' , 'email' ) ;
$db->update( array( 'username'=>'testing' ) ) ;
$db->commit() ;

// prepare an update with multiple changes, use commit() to commit the changes to the db
$db->select( 'users' , 'email' )->update( array( 'username'=>'testing','active'=>false ) )->commit() ;
// or
$db->select( 'users' , 'email' ) ;
$db->update( array( 'username'=>'testing','active'=>false ) ) ;
$db->commit() ;

// prepare a delete, use get() to view the original table data
$db->delete( 'users' , array( 'username'=>'testing' ) )->get() ;

// prepare a delete, use get( 'delete' ) to view the new table data before commiting
$db->delete( 'users' , array( 'username'=>'testing' ) )->get( 'delete' ) ;

// prepare a delete, use commit() to commit the changes to the db
$db->delete( 'users' , array( 'username'=>'testing' ) )->commit() ;
// or
$db->delete( 'users' , array( 'username'=>'testing' ) ) ;
$db->commit() ;

// prepare an update with multiple changes, use commit() to commit the changes to the db
$db->delete( 'users' , array( 'active'=>true , 'username'=>'chrisdlangton' ) )->commit() ;
// or
$db->delete( 'users' , array( 'active'=>true , 'username'=>'chrisdlangton' ) ) ;
$db->commit() ;

 */
echo "<h1>results</h1>";
$users = $db->select( 'users' )->get() ;
echo "<pre>";
print_r( $users ) ;
echo "</pre>";

 
	function minify($file) {
		/* remove comments */
		$lines = explode("\n", $file);
		$lines = array_map(
		function($line) {
			return preg_replace("@\s*//.*$@", '', $line);
		},
		$lines
		);
		$file = implode("\n", $lines);
		/* remove tabs, spaces, newlines, etc. */
		$file = str_replace(array("\r\n","\r","\n","\t","  ","    ","     "), "", $file);
		/* remove other spaces before/after ) */
		$file = preg_replace(array('(( )+\))','(\)( )+)'), ')', $file);
		return $file;
	}
	$files = array(
	'js/' . basename(__FILE__, '.php') . '.lib.js'
	,'js/viewmodel.js'
	,'js/get.js'
	);
	foreach($files as $file) {
		$fileName .= str_replace("js/", "",str_replace(".js", "",$file)).'.';
		$minified .= minify(file_get_contents($file));
	}
	$handle = fopen('js/min/'.$fileName.'min.js', 'w');
	fwrite($handle, $minified);
	fclose($handle);
	echo '<script src="js/min/' . $fileName . 'min.js?v='. $version .'"  charset="utf-8"></script>'.PHP_EOL;
?>
    </body>
</html>
