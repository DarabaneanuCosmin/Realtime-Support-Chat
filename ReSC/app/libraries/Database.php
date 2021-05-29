<?php 

class Database{
    protected $connection;
	protected $lastQuery;
    protected $lastResult;
    protected $show_errors = TRUE;
    protected $query_closed = TRUE;
	public $query_count = 0;

	public function __construct($dbhost = 'localhost',
                                $dbuser = 'root', $dbpass = '',
                                $charset = 'utf8', $dbname = 'web') {
		$this->connection = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
		if ($this->connection->connect_error) {
			$this->error('Failed to connect to MySQL - ' . $this->connection->connect_error);
            echo $this->error . "<br>";
		}
		$this->connection->set_charset($charset);
	}

    
 public function executeQuery($query){
        $this->lastQuery = $query;

        $status = $this->connection->query($query);

        if(!$status){
            echo $this->connection->error . "<br>";
        }

        $this->query_count++;
        
        $this->lastResult = $status;

        return $status;
    }

    public function query($query,$data){
    $sth = $this->connection->prepare($query);
    $role = 'User';
    $sth->bind_param('dsss',$data['number'], $data['username'],$data['password'],$role);
     $sth->execute();
   
}

public function insertIntoSession($data){
    $query = "INSERT INTO session VALUES(?,?,?,?)";
    $sth = $this->connection->prepare($query);
    $sth->bind_param('sdss',$data['sessionId'], $data['idUser'],$data['create_date'],$data['username']);
     $sth->execute();
}

public function updateIntoSession($data){
    $query = "UPDATE session SET sessionId=? WHERE idUser=?";
    $sth = $this->connection->prepare($query);
    $sth->bind_param('sd',$data['sessionId'], $data['idUser']);
     $sth->execute();
}

public function existUserName($username){
    $query = "SELECT username FROM USER WHERE username = '".$username."'";  
    $this->executeQuery($query);
    if($this->isEmpty($this->lastResult)){
        return false;
    }  
    return true;
}
  


    public function existsId($query,$id){
        $sth = $this->connection->prepare($query);
        $sth->bind_param('d',$id);
        $sth->execute();
       $result = $sth->get_result();
        if($result->num_rows === 0){
           return false;
       }else{
           return true;
       }
       $sth->close();
    }

    public function existsUser($username,$password){
        $query = "SELECT username, password FROM USER WHERE username = ? and password = ?";
            $sth = $this->connection->prepare($query);
            $sth->bind_param('ss',$username, $password);
            $sth->execute();
           $result = $sth->get_result();
            if($result->num_rows === 0){
               return false;
           }else{
               return true;
           }
           $sth->close();
        }
    
        public function getIdAndRolUserByUsername($username){
            $query = "SELECT id,rol from USER WHERE username = ?";
            $sth = $this->connection->prepare($query);
            $sth->bind_param('s',$username);
            $sth->execute();
            $result = $sth->get_result();
            if($result->num_rows === 0)return -1;
            
            if($row = $result->fetch_assoc()){
               $data =['id' =>  $row['id'],
               'rol' => $row['rol']
                        ];
            
            return $data;
                }
            $sth->close();
        }



    public function fetchLastResults(){
        $json = mysqli_fetch_all ($this->lastResult, MYSQLI_ASSOC);
        
        echo json_encode($json);

        return json_encode($json);
    }

    public function isEmpty($result){
        $arrayObjects = $this->fetchLastResults();

        return empty(json_decode($arrayObjects, true));
    }

    public function error($error) {
        if ($this->show_errors) {
            exit($error);
        }
    }
}
?>