
import './App.css';
import {useState,useEffect} from "react";
import React from 'react';
import Axios from 'axios';


function App() {
  const [name,setName] = useState('');
  const [age,setAge] = useState();
  const [listofFriends,setListofFriends] = useState([]);



  const AddFriend = () =>{
    Axios.post("http://localhost:3001/addfriend",{
      name:name,
      age:age,

    }).then(()=>{
     setListofFriends([...listofFriends,{name:name, age:age}]);

    }).catch(()=>{
      alert("It didnt work");
      
    })
    
  }

  const updateFriend = (ids) =>{
    const newAge =prompt("Enter New Age: ")
    Axios.put("http://localhost:3001/update",{newAge: newAge, id: ids}).then(()=>{
      setListofFriends(listofFriends.map((val)=>{
        return val._id==ids?{_id:ids,name:val.name,age:newAge} :val 
      }))
    })
 };


 const deleteFriend = (id) =>{
  Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
    setListofFriends(listofFriends.filter((val)=>{
          return val._id!==id;
    }))
  })
 }

  useEffect(()=>{
     
    Axios.get("http://localhost:3001/read").then((response)=>{
      setListofFriends(response?.data);

    }).catch(()=>{
      console.log("Error is found");
    })
  },[]);


  return (
    <div className="App">
      
      <div className="inputs">
      <input placeholder="Add your Friend's Name" type="text" onChange={(e)=>setName(e.target.value)}></input>
     <input placeholder="Add your Friend's Age" type="number" onChange={(e)=>setAge(e.target.value)}></input>
     

     

     <button className="submit" onClick={AddFriend}>Add to Database</button>
      </div>

      <div className='listoffriend'>

       {listofFriends.map((frnds) =>{
        return (
          <div className='friendContainer'>
          <div className='friend'>
          <h3>Name:{frnds.name}</h3> 
          <h3>Age: {frnds.age}</h3>
          </div>
          <button onClick={()=>{
            updateFriend(frnds._id)
          }}>Update</button>
          <button onClick={()=>{
            deleteFriend(frnds._id);
          }}>Delete</button>
          </div>
        )
       })}

      </div>
    
    </div>
  );
}

export default App;
