<?php

class Home extends Controller
{
    public function index()
    {
        $this->view('home/index', []);
    }

    public function register()
    {
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
                        $this->view('home/index',[]);
                    }
                }
            } 
        }
        header("location: ../index");
        $this->view('home/index',[]);
    }
}
?>