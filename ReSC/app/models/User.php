<?php

require_once "../app/libraries/Database.php";
class User  {

    public $db;
    public $username = '';
    public $password = '';
    public $id = -1;
    public $lastDate = '';
    public $rol = '';

    public function __construct()
    {
        

        $this->db = new Database('localhost', 'root', '', 'utf8', 'web');
        
    }
    public function findUserByUsername($username){
         if($this->db->existUserName($username) == true){
             return true;
         }  
    
         return false;
         
    }
    
    public function insertIntoSession($data){
        if($this->existsId("SELECT idUser FROM session WHERE idUser = ?",$data['idUser'])==false){
        $this->db->insertIntoSession($data);
        }else{
            $this->db->updateIntoSession($data);
        }
    }

    public function existsId($query,$id){
        return $this->db->existsId( $query,$id);
    }

    public function register($data){
      $this->db->query("INSERT INTO USER VALUES(?,?,?,?)",$data);
     }
     public function login($data){
         return  $this->db->existsUser($data['username'],$data['password']);
     }
     public function getIdUser($username){
       return $this->db->getIdAndRolUserByUsername($username);
     }
     /*
     public function gen_uuid() {
        return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            // 32 bits for "time_low"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
    
            // 16 bits for "time_mid"
            mt_rand( 0, 0xffff ),
    
            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand( 0, 0x0fff ) | 0x4000,
    
            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand( 0, 0x3fff ) | 0x8000,
    
            // 48 bits for "node"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
        );
    }
    */
    function guidv4()
    {
        if (function_exists('com_create_guid') === true)
            return trim(com_create_guid(), '{}');
    
        $data = openssl_random_pseudo_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
    }
 



?>