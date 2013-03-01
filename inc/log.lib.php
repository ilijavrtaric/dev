<?php
class log
{
	private static $path;
	private static $filename;
	private static $stats;
	private static $level;
	private static $msg = NULL;
	private static $max_filesize;
	private static $save;
	private static $handle = false;
	private static $newLine = false;
	
	public function __construct()
	{
		if (LOG_ENABLED)
		{
			// path to store the log file, default to www doc root
			defined('LOG_DIR') ? $this->path = $_SERVER['DOCUMENT_ROOT']."/".LOG_DIR : $this->path = $_SERVER['DOCUMENT_ROOT']."/";
			// does this script have a filename defined
			if (!defined('LOG_FILENAME_DEFAULT')) { define('LOG_FILENAME_DEFAULT', "log.txt"); }
			defined('LOG_FILENAME') ? $this->filename = LOG_FILENAME : $this->filename = LOG_FILENAME_DEFAULT;
			// get statistical info if configured
			LOG_DATETIME ? $this->stats = str_replace(LOG_DELIMITER, "",date('m/d/Y h:i:s a', time())).LOG_DELIMITER : $this->stats .= LOG_DELIMITER;
			LOG_SCRIPT ? $this->stats .= str_replace(LOG_DELIMITER, "",basename($_SERVER['REQUEST_URI'])).LOG_DELIMITER : $this->stats .= LOG_DELIMITER;
			LOG_IP ? $this->stats .= str_replace(LOG_DELIMITER, "",functions::userIp()).LOG_DELIMITER : $this->stats .= LOG_DELIMITER;
			LOG_UA ? $this->stats .= str_replace(LOG_DELIMITER, "",$_SERVER['HTTP_USER_AGENT']).LOG_DELIMITER : $this->stats .= LOG_DELIMITER;
			LOG_REFERER ? $this->stats .= str_replace(LOG_DELIMITER, "",$_SERVER['HTTP_REFERER']).LOG_DELIMITER : $this->stats .= LOG_DELIMITER;
			LOG_LOGGEDINUSER ? $this->stats .= str_replace(LOG_DELIMITER, "",$_SESSION['username']).LOG_DELIMITER : $this->stats .= LOG_DELIMITER;
			// max_filesize if not defined default to 1 mb
			defined('LOG_MAX_FILESIZE') ? $this->max_filesize = LOG_MAX_FILESIZE *(1024*1024) : $this->max_filesize = 1 *(1024*1024);
			// open the file 
			$this->open();
			return $this;
		}
		else { throw new Exception("Logging not enabled"); }
	}
    public function __destruct()
    {
		if (!$this->save === true) { $this->save(); }
		$this->close();
    }
	private function open()
    {
		// if file already open
		if ($this->handle !=false) { return $this; }
		// define filepath property
		$fp = $this->path.$this->filename;
		// check if file exists
		if (file_exists($fp))
		{
			// if file too large backup
			if (filesize($fp) > $this->max_filesize) {
				$newfile = $fp.date('[D M d G:i:s Y]').'.bak';
				if (!copy($fp, $newfile)) {
					throw new Exception("failed to backup $fp to $newfile");
				}
				// delete old file so we can create a fresh one (truncate can corrupt when read to RAM)
				if (!unlink($fp)) {
					throw new Exception("failed to delete old log $fp");
				}
				$create = true;
			}
			else // size ok, open for writing
			{
				$this->handle = fopen($fp, "a");
				if (!$this->handle) {
					throw new Exception("failed to open $fp for writing");
				}
			}
		}
		else // create if not exist
		{
			$create = true;
		}
		// create and open for writing
		if ($create === true) {
			$this->handle = fopen($fp, "c");
			if (!$this->handle) {
				throw new Exception("failed to create $fp");
			}
			if (!fwrite($this->handle, "DATETIME,SCRIPT,IP,USER_AGENT,HTTP_REFERER,LOGGED_IN_USER,LOG_LEVEL,MESSAGE" . PHP_EOL)) {
				throw new Exception("failed to write headings to $fp");
			}
		}
		return $this;
    }
	public function logLevel($level = 99)
    {
		if (is_numeric($level))
		{
			switch ($level) {
				case 0: $this->level = "OPERATION"; break;
				case 1: $this->level = "WARNING"; break;
				case 2: $this->level = "ERROR"; break;
				case 3: $this->level = "DEBUG"; break;
				default: $this->level = "UNHANDLED"; break;
			}
			return $this;
		}
		else
		{
			throw new Exception("Log level accepts only numeric values");
		}
    }
	public function add($message)
    {
		if ($this->newLine)
		{
			$this->msg = null;
			$this->newLine = false;
		}
			
		if (is_null($this->msg) && strlen($message) > 0){
			$this->msg = $message;
			$this->save = false;
			return $this;
        }
		elseif (!is_null($this->msg) && strlen($this->msg) > 0 && strlen($message) > 0)
		{
			$this->msg .= " | ".$message;
			$this->save = false;
			return $this;
		}
		else
		{
			throw new Exception("Message string must be at least 1 character in length");
		}
    }
	public function save()
    {	
        $strLine = $this->stats . $this->level . LOG_DELIMITER . str_replace(LOG_DELIMITER, "",$this->msg);
		
		$fp = $this->path.$this->filename;
		if (file_exists($fp)) 
		{
			fwrite($this->handle, $strLine . PHP_EOL);
			$this->newLine = true;
			$this->save = true;
			return $this;
		}
		else
		{
			throw new Exception("Opened file is no longer accessible");
		}

    }
	private function close()
    {
		$fp = $this->path.$this->filename;
		if (file_exists($fp))
		{
			fclose($this->handle);
			$this->newLine = false;
			return true;
		}
		else
		{
			throw new Exception("Opened file is no longer accessible");
		}
    }
}
?>