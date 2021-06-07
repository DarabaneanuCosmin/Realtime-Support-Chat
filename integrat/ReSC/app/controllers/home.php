<?php

require_once "../app/models/User.php";

class Home extends Controller
{
    public function index(){
        $this->view('home/index', []);
        //session_regenerate_id(true);
        $user = new User();
        $number =  rand(1,99999);
        while($user->existsId("SELECT id FROM USER WHERE id = ?",$number) == true){
            $number =  rand(1,99999);
        }
        $sessionData = [
            'sessionId'=> session_id(),
            'idUser'=> $number,
            'create_date' => date('H:i:s'),
            'username'=> NULL
        ];
        $user->insertIntoSession($sessionData);
    }
    public function register_form(){
      
        if(isset($_POST['register'])){
            $user = new User();
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
             $data = [
                 'username' => trim($_POST['username']),
                 'password' =>md5(trim($_POST['password'])),
                 'password_confirmation' => trim($_POST['password_confirmation']),
                'number'=> ""
                
              ];
                
             if($user->findUserByUsername($data["username"]) == true){
                header("location: ../register_form?error=invalidusername");
                exit();   
                    }else{
                  
                        
                $data['number'] =  rand(1,99999);
                while($user->existsId("SELECT id FROM USER WHERE id = ?",$data['number']) == true){
                    $data['number'] =  rand(1,99999);
                }
                $user->register($data);        
                header("location: ../register_form?error=none");
                exit(); 
             }
         }else{
            $this->view('home/register_form',[]);
         }
        
    }
    public function login_form(){
        if(isset($_POST['login'])){
            $user = new User();
            
         
            $data = [
                'username' => trim($_POST['username']),
                'password' => md5(trim($_POST['password']))
               
             ];
              if($user->login($data) == true){
                  
                  $db_data = $user->getIdUser($data['username']);
                  $idUser = $db_data['id'];
                  $rolUser = $db_data['rol'];
                  if($idUser != -1){
                      
                    session_start();
                    session_regenerate_id(true);
                    $_SESSION['id'] = $idUser;
                    $_SESSION['rol'] = $rolUser;
                    $_SESSION['username'] = $data['username'];
                    $_SESSION['password'] = $data['password'];
                    $sessionData = [
                        'sessionId'=> session_id(),
                        'idUser'=> $idUser,
                        'create_date' => date('H:i:s'),
                        'username'=> $_SESSION['username']
                    ];
                   
                    $user->insertIntoSession($sessionData);
                   // session_regenerate_id();*/
                   header("location: ../home/index");
                   exit(); 
                  }
                  
             }else{
                header("location: ../login_form?error=invaliduser");
                exit();   
             }
          
        }else{
            $this->view('home/login_form',[]);
          
        }
        
    }
    public function logout(){
        $this->view('home/logout',[]);
    }

    
    public function adminpanel(){
        $this->view('home/adminpanel', []);
    }

    public function about(){
        $this->view('home/about', []);
    }
}
?>