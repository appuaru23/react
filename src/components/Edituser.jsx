import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Edituser = () => {
	const [user, setuser] = useState({
		title : "",
		description: "",
		category : "",
	}); 
	const {title, description, category} = user;
     const { id } = useParams();
    const onInputChange = (e) => {
    	setuser({...user,[e.target.name]:e.target.value});

    	
    }

    useEffect(()=>{
    	GetProductdetails();
    },[])

    const GetProductdetails = async() => {
    	debugger;
    	const productdata = await axios.get(`https://fakestoreapi.com/products/${id}`);
    	console.log(productdata.data);
    	setuser(productdata.data);
    }

    const submitform = async e => {
    	e.preventDefault();
    	console.log(user);
    	const data = "api";
    	
    }

	return(
		<div className="container">
			<div className="w-75 mx-auto shadow p-5">
				<h2 className="text-center mb-4">Edit User</h2>
				<form onSubmit={ e => submitform(e)}>
					<div className="form-group">
						<input
						type="text"
						className="form-control form-control-lg"
						placeholder="Enter Your Name"
						name="title" value={title}
						onChange={e => onInputChange(e)} />
					</div>

					<div className="form-group">
						<input
						type="text"
						className="form-control form-control-lg"
						placeholder="Enter Your Description"
						name="description" value={description}
						onChange={e=>onInputChange(e)}/>
					</div>

					<div className="form-group">
						<input
						type="email"
						className="form-control form-control-lg"
						placeholder="Enter Your Category"
						name="category" value={category}
						 onChange={e=>onInputChange(e)}/>
						
					</div>

					<button className="btn btn-primary btn-block">Update User</button>
				</form>
			</div>
		</div>
	)
}
export default Edituser;