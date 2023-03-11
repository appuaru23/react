import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid, Paper, Avatar, TextField, Button, Card, CardActionArea, CardMedia, Typography, CardContent, CardHeader } from "@material-ui/core";
import apipath from "../api/Api";
import { red } from '@mui/material/colors';
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from "axios";


const Dashboard = () => {
	const paperstyle={padding:20, margin:"20px"}
	const tablestyle={ marginTop: 20 }
	const [product,setProduct] = useState();
	const [open, setOpen] = React.useState(false);
	const [username,setUserName] = useState();
	const [userdeatail,setUserdetail] = useState([]);
	const [inputfile,setInputFile] = useState();
	
  	
  	useEffect( async () => {
		const products =  await apipath.get("/products");
		setProduct(products.data);

		const userdetail = await axios.get("http://localhost/usermgmt_api/index.php?action=getuserdetails&id=1");
		setUserdetail(userdetail.data);
		console.log(userdetail.data);
	},[])

	const deleteUser = (id) => {

	}

	const StyledButton = styled(Button)`
	 	color: #0d6efd;
	`;

	const Modalbutton = styled(Button)`
	 	margin-top: 10px;
    	float: right
	`;

	const style = {
		position: 'absolute',
		top: '20%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		borderRadius:'4px',
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
	};

	const handleEditUser = () => {
		setOpen(true);
	}

	

	const handleClose = () => setOpen(false);

	const handleFileInput = (e) => {
		setInputFile(e.target.files[0]);
	}

	const userDetailsSubmit = () => {
		debugger;
		const formData = new FormData();
		formData.append( 
	        "myFile", 
	        inputfile, 
	    );
	    formData.append("email",userdeatail.email); 
	    formData.append("mobno",userdeatail.mobno); 
	    formData.append("password",userdeatail.password); 
	    formData.append("name",userdeatail.name); 
		formData.append("action","userupdate"); 
    
    // Details of the uploaded file 
   
    
    // Request made to the backend api 
    // Send formData object 
    axios.post("http://localhost/usermgmt_api/index.php", formData); 
	}

	const handleUpdateuser = (e) => {
		const {name,value} = e.target;
		setUserdetail({...userdeatail,[name]:value})
		
	}

	return(
		<React.Fragment>
		<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
			      Edit User Details
			    </Typography>
				<Grid container>
	  				<Grid item xs={4}>
					 	<FormControl variant="standard">
							<InputLabel htmlFor="name-helper">Name</InputLabel>
							<Input id="name-helper" value={userdeatail.name} name="name" aria-describedby="component-helper-text" fullWidth={true} onChange={handleUpdateuser}/>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<FormControl variant="standard">
							<InputLabel htmlFor="email-helper">Email</InputLabel>
							<Input id="email-helper" value={userdeatail.email} aria-describedby="component-helper-text" onChange={handleUpdateuser} name="email"/>
						</FormControl>

					</Grid>

					<Grid item xs={4}>
					 	<FormControl variant="standard">
							<InputLabel htmlFor="phone-helper">Phone Number</InputLabel>
							<Input id="phone-helper" value={userdeatail.mobno} aria-describedby="component-helper-text" fullWidth={true} onChange={handleUpdateuser} name="mobno"/>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<FormControl variant="standard">
							<InputLabel htmlFor="password-helper">Password</InputLabel>
							<Input id="password-helper" type="password" aria-describedby="component-helper-text" onChange={handleUpdateuser} name="password"/>
						</FormControl>

					</Grid>

					<Grid item xs={8}>
						<FormControl variant="standard">
							<InputLabel htmlFor="image-helper">User Image</InputLabel>
							<Input id="image-helper" aria-describedby="component-helper-text" onChange={handleFileInput} type="file"/>
						</FormControl>

					</Grid>
				</Grid>
				
				<Modalbutton variant="outlined" onClick={userDetailsSubmit}>Submit</Modalbutton>
				
				
      		</Box>
		</Modal>

		<Paper elevation={10} style={paperstyle}>
			<Grid container spacing={3}>
				<Grid item xs={4}>
				    <Card sx={{ maxWidth: 345 }}>
					    <CardActionArea>
					        <CardHeader
					        avatar={
					          <Avatar style={{ backgroundColor: '#e91e63' }} aria-label="recipe">
					            A
					          </Avatar>
					        }
					        
					        title={userdeatail.name}
					        subheader={userdeatail.email}
					      />
					        <CardContent>
					        	<StyledButton variant="outlined" onClick={handleEditUser} >Edit Profile</StyledButton>
					        </CardContent>
					    </CardActionArea>
					</Card>
				</Grid>

				<Grid item xs={4}>
				    <Card sx={{ maxWidth: 345 }}>
					    <CardActionArea>
					        <CardMedia
					          component="img"
					          height="140"
					          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
					          alt="green iguana"
					        />
					        <CardContent>
					        	<Typography gutterBottom variant="h5" component="div">
					            Add Wages
					        	</Typography>
					        	<Typography variant="body2" color="text.secondary">
					            Lizards are a widespread group of squamate reptiles, with over 6,000
					            species, ranging across all continents except Antarctica
					        	</Typography>
					        </CardContent>
					    </CardActionArea>
					</Card>
				</Grid>

				<Grid item xs={4}>
				    <Card sx={{ maxWidth: 345 }}>
					    <CardActionArea>
					        <CardMedia
					          component="img"
					          height="140"
					          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
					          alt="green iguana"
					        />
					        <CardContent>
					        	<Typography gutterBottom variant="h5" component="div">
					            View Wages
					        	</Typography>
					        	<Typography variant="body2" color="text.secondary">
					            Lizards are a widespread group of squamate reptiles, with over 6,000
					            species, ranging across all continents except Antarctica
					        	</Typography>
					        </CardContent>
					    </CardActionArea>
					</Card>
				</Grid>
			</Grid>

			<table style={tablestyle} class="table border shadow">
            <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
			{product!=undefined && product.length > 0 ? product.map((user,id)=> (
				<tr>
                <th scope="row">{user.id}</th>
                <td>{user.title}</td>
                <td>{user.description}</td>
                <td>{user.category}</td>
                <td><Link to={`/edituser/${user.id}`}>Edit </Link>
                	<Link to="/" onClick={() => deleteUser(user.id)}>Delete </Link>
                </td>
               
                </tr>
                
			)): <tr><td>No Content Found</td></tr>}
			 </tbody>
        </table>
		</Paper>
		</React.Fragment>
	)
}

export default Dashboard;