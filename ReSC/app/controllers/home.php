<?php

class Home extends Controller
{
    public function index(){
        session_start();
        $this->view('home/index', []);
        $user = $this->model('User',[session_id()]);
    }

    public function register(){
        if(isset($_POST['submit'])){
            $encodedData = file_get_contents('data.json');
            $data = json_decode($encodedData,true);
            $arr = array(
                'username'  => $_POST['username'],
                'password'  => $_POST['password'],
            );
            $data[] = $arr;
            $json_string = json_encode($data);
            file_put_contents('data.json', $json_string);

        }
        $this->view('home/register',[]);
    }

    public function login(){
        if(isset($_POST['submit'])){
            $encodedData = file_get_contents('data.json');
            $data = json_decode($encodedData,true);
            $arr = array(
                'username'  => $_POST['username'],
                'password'  => $_POST['password'],
            );
            foreach($data as $user){
                if($arr['username'] == $user['username']){
                    if($arr['password'] == $user['password'])
                    {
                        $this->view('home/login',[]);
                    }
                }
            } 
        }
        header("location: ../index");
        $this->view('home/index',[]);
    }

    public function adminpanel(){
        $this->view('home/adminpanel', []);
    }

    public function about(){
        $this->view('home/about', []);
    }
}
?>