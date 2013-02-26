<?php
class session
{
    // register
        // create a folder
        // create a default app config
        // create profile data - class, home planet, base stats, clan, ect
        // create hero data - stats, equipt, mercs, vessel
        // create vessel data - upgrades
    // login
        // set session
        // load landing page
    // logout
}

class user
{
	private $conf;
	private $profile;
	private $hero;
	private $vessel;

	public function __construct()
	{
        $directory = '../user/' . $_SESSION['username'];
        $scanned_dir = array_diff( @scandir( $directory ), array( '..' , '.' ) ) ;
        $this->conf = json_decode( @file_get_contents( "../user/" . $_SESSION['username'] . "/conf.json" ), true ) ;
        $this->profile = json_decode( @file_get_contents( "../user/" . $_SESSION['username'] . "/profile.json" ), true ) ;
        $this->hero = json_decode( @file_get_contents( "../user/" . $_SESSION['username'] . "/hero.json" ), true ) ;
        $this->vessel = json_decode( @file_get_contents( "../user/" . $_SESSION['username'] . "/vessel.json" ), true ) ;
        return $this;
    }
	public function conf()
	{
		return $this->conf;
	}
	public function set($confObj)
	{
		@file_put_contents( "../user/" . $_SESSION['username'] . "/conf.json" , json_encode( $confObj ) );
        $this->conf = $confObj;
        return $this;
	}

}

class vessel
{
	private $base; // base stats
	private $upgrades; // available upgrades

    public function data($name)
    {
        $directory = '../vessel/' . $name;
        $scanned_dir = array_diff( @scandir( $directory ), array( '..' , '.' ) ) ;
        $this->base = json_decode( @file_get_contents( "../vessel/" . $name . "/base.json" ), true ) ;
        $this->upgrades = json_decode( @file_get_contents( "../vessel/" . $name . "/upgrades.json" ), true ) ;
        return $this;
    }
    public function base()
	{
		return $this->base;
	}
    public function upgrades()
	{
		return $this->upgrades;
	}
}
?>