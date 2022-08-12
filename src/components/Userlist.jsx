import React, {useState,useEffect} from "react";

import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Userlist = () => {
	const paperstyle = {width:300, margin:"20px auto", padding:20}
	const avatarstyle = {backgroundColor:"green"}
	const history = useNavigate();
	const initialval = {username : "", password: ""}
	const [formvalue,setFormValue] = useState(initialval);
	const [formerrors,setFormError] = useState({});
	const [submit,setSubmit] = useState(false);
	
	const handlesubmit = () => {
		setFormError(validate(formvalue));
		setSubmit(true);
	}

	useEffect(() => {
		if(Object.keys(formerrors).length === 0 && submit){
			fetchUserResult(formvalue);
		}
	},[formerrors])

	const fetchUserResult  = async (uservalue) => {
		
		const userdata = {
			action : "login",
			name : uservalue.username,
			password : uservalue.password
		}
		await axios.post("http://192.168.226.85/usermgmt_api/index.php",userdata).then(response =>{
			if(response.status === 200 && response.data.status == "success"){
				history('/dashboard')
			}
			else{
				alert(response.data.status);
			} 
			}
		)
	}

	const validate = (values) => {
		const error = {};
		if(!values.username){
			error.username = "Username is required";
		}

		if(!values.password)
		{
			error.password = "Password is required";
		}
		return error;
	}

	const handleFormChange = (e) => {
		const {name,value} = e.target;
		setFormValue({...formvalue,[name]:value})
	}

	return(
		<Grid>
			<Paper elevation={10} style={paperstyle}>
				<Grid align="center">
					<Avatar style={avatarstyle}><PersonOutlineIcon/></Avatar>
					<h4>Login</h4>
				</Grid>

				<TextField label="Email" variant="standard" fullWidth required onChange={handleFormChange} name="username" value={formvalue.username}/>
					<p>{formerrors.username}</p>
				<TextField type="password" label="Password" variant="standard" fullWidth onChange={handleFormChange} name="password" value={formvalue.password}/>
					<p>{formerrors.password}</p>
				<FormGroup>
    				<FormControlLabel control={<Checkbox defaultChecked />} label="Need to remember Password" />
    			</FormGroup>
				<Button variant="contained" color="primary" fullWidth onClick={() => handlesubmit()}>Sign In</Button>
			</Paper>
		</Grid>
		
	)
}

export default Userlist;