<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents('php://input'), true);


$requesttype = $_SERVER['REQUEST_METHOD'];

if($requesttype == "POST")
{
	
	//POST DATA
	if($_POST['action'] == "userupdate"){
		
		if(isset($_FILES['myFile'])){
		      $errors= array();
		      $file_name = $_FILES['myFile']['name'];
		      $file_size =$_FILES['myFile']['size'];
		      $file_tmp =$_FILES['myFile']['tmp_name'];
		      $file_type=$_FILES['myFile']['type'];
		      
		      
		      if($file_size > 2097152){
		         $errors[]='File size must be excately 2 MB';
		      }
		      
		      if(empty($errors)==true){
		         move_uploaded_file($file_tmp,"uploads/".$file_name);
		         
		      }else{
		         print_r($errors);
		      }
		}

		$email=$_POST['email'];
		$mobno=$_POST['mobno'];

		$password=$_POST['password'];
		$name=$_POST['name'];
		

		$sql = "UPDATE table_users SET name='".$name."', email='".$email."', password='".$password."', mobno='".$mobno."', image='".$file_name."' WHERE id=1";

		$results = $db_conn->query($sql);
		
		
	   	echo "done";exit;
	   	//echo json_encode($result);exit;


		
	}

	if($data['action'] === "login")
	{
		
		$name=$data['name'];
		$password=$data['password'];
		$sql = "SELECT id,name FROM table_users where name='".$name."' and password='".$password."'";

		$results = $db_conn->query($sql);
		$row = $results->fetch_assoc();

	
	   $results->free_result();
	   $result = [];
	   if($row){
	   		
	   		$result['status'] = "success";
   			$result['id'] = $row['id'];
   			$result['name'] = $row['name'];
	   	}else{
	   		$result['status'] = "failure";
   			$result['id'] = '';
   			$result['name'] = '';
	   	}
	   	echo json_encode($result);exit;
		
	}

	if($data['action'] === "userupdate")
	{
		
		echo "<pre>";print_r($_FILES);
		
	}
}else if($requesttype == "GET")
{
	//echo "";print_r($_GET);
	if($_GET['action'] == "getuserdetails")
	{
		$id = $_GET['id'];

		$sql = "SELECT id,name,email,mobno,password FROM table_users where id='".$id."'";
		$results = $db_conn->query($sql);
		$row = $results->fetch_assoc();

	
	   $results->free_result();
	   $result = [];
	   if($row){
	   		
	   		$result['status'] = "success";
   			$result['id'] = $row['id'];
   			$result['email'] = $row['email'];
   			$result['mobno'] = $row['mobno'];
   			$result['password'] = $row['password'];
   			$result['name'] = $row['name'];
	   	}else{
	   		$result['status'] = "failure";
   			$result['id'] = '';
   			$result['name'] = '';
	   	}
	   	echo json_encode($result);exit;
	}else{
		echo '1233';
	}
}


?>