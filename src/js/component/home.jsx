import React, { useState, useEffect } from "react";


const Home = () => {
	const [userData, setUserData] = useState([]);
	const [listTask, setListTask] = useState('');
	const [userName, setUserName] = useState('fab');
	const url = 'https://playground.4geeks.com/todo/';
	const totaltasks = userData.todos;

	useEffect(() => {
		createUser()
		getUserData()
	}, []);

	
	
	const createUser = async () => {
		try {

			const resp = await fetch(url + 'users/' + userName, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if(!resp.ok) throw new Error('Uups, Something went wrong!');
			const data = await resp.json();
			//console.log(data);
			setUserData(data);
		} catch (error) {
			console.error(error);
		}
	}

	const getUserData = async () => {
		try {
			const resp = await fetch(url + 'users/' + userName);
			if(!resp.ok) throw new Error('Uups, Something went wrong!');
			const data = await resp.json();
			//console.log(data.todos);
			setUserData(data);
		} catch (error) {
			console.error(error);
		}
	}

	const createTask = async () => {
		try {
			const payload = {
				label: listTask,
				is_done: false
			} 
			const resp = await fetch(url + 'todos/' + userName, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});
			if(!resp.ok) throw new Error('Uups, Something went wrong!');
			const data = await resp.json();
			//console.log(data);
			getUserData(data);
			setListTask('');
		} catch (error) {
			console.error(error);
		}
	}
	const handleDeleteTask = async (id) => {
		try {

			const resp = await fetch(url + 'todos/' + id, {
				method: 'DELETE'
			});
			if(!resp.ok) throw new Error('Uups, Something went wrong!');
			getUserData();
		} catch (error) {
			console.error(error);
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (listTask.trim() === '') {
			const alert = alert('Todo list cannot be empty!');
			return (<p className="text-dark">{alert}</p>); 
		}
		createTask();

	}
	const handleChange = e => {
		setListTask(e.target.value)
	}
	
 	return (
		<div className="container">
			<div className="row p-3">
				<div className="col-sm-12 col-md-2 col-lg-2"></div>
				<div className="col-sm-12 col-md-8 col-lg-8 rounded bg-container">
					<h1 className="text-center mt-2 title">Todos</h1>
					<form onSubmit={handleSubmit}>
						<input className="form-control input-style" type="text" onChange={handleChange} value={listTask} placeholder="Add Todos" aria-label="default input example"/>
					</form>
					<ul className="list-group list-group-flush bg-list">
						{userData.todos?.map(el => <li  className="list-group-item bg-list-child" key={el.id}>{el.label}<span className="fa-solid fa-trash trash-i" onClick={e => handleDeleteTask(el.id)}></span></li>)}
						<div className="total-items">{totaltasks?.length}<span className="total-items total-item-txt">{totaltasks?.length > 1 ? 'items': 'item' }</span></div>
					</ul>
				</div>
				<div className="col-sm-12 col-md-2 col-lg-2"></div>
			</div>
		</div>
	);
};

export default Home;
