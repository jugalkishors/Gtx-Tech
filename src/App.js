import React, { useState, useEffect } from 'react';
import './App.css';
import allUsers from './userData/tenantsData';
import allUserLists from './userData/allUsersList';

function App() {
  
  const [state, setState] = useState({
    name:'',
    addName:'',
  });

  const clearState=()=>{
    setState({
      addName:'',
    })
  }

  const [tenantsDetails, setTenantsDetails] = useState([]);
  const [allUserName, setAllUserName] = useState({});
  const [addDataStatus, setAddDataStatus] = useState();
  const [selectedKey, setSelectedKey] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  //get all data in states...
  useEffect(()=>{
    setTenantsDetails(allUsers);  
    setAllUserName(allUserLists);
  },[]);

  //delete user card (House list)...
  const deleteUser=(index)=>{
    tenantsDetails.splice(index, 1);
    setTenantsDetails([...tenantsDetails]);
  }

  //delete perticular user from card...
  const deleteUserOne=(key, index)=>{
    delete allUserName[key][index];
    setAllUserName({...allUserName});
  }

  //assign value to edit input box for edit purpose
  const editFillName=(key, index)=>{
    setState({...state, name:allUserName[key][index]});
    setSelectedKey(key);
    setSelectedIndex(index);
  }

  //update value that filled by user
  const EditData=()=>{
    allUserName[selectedKey][selectedIndex] = state.name;
    setAllUserName({...allUserName});
  }

  //add user data with push value
  const addUserData=(val)=>{
    allUserName[val].push(state.addName);
    setAllUserName({...allUserName});
    clearState();
  }


  return (
    <div className="container" style={{marginTop:'5%'}}>

      <div style={{marginBottom:'2%'}}>
        
          <p><input type="text" name="name" placeholder="Edit Name" value={state.name} onChange={(event)=>setState({name: event.target.value})} required/>
          <button className="btn btn-sm btn-success" onClick={()=>EditData()}>Edit</button></p>
      </div>

      <div className="row">
        {/* Card outer body */}
          {
            tenantsDetails.map((item)=>{
              return(
                <div className="col-sm">
                  <div className="card border-secondary mb-3" style={{width:'18rem'}}>
                    <div className="card-header">
                    {item?.houseType}
                    <button className="btn btn-sm btn-success" onClick={()=>setAddDataStatus(allUserName[item.houseKey])}>Add</button>
                    <button className="btn btn-sm btn-danger" style={{marginLeft:'2%'}} onClick={()=> deleteUser(tenantsDetails.indexOf(item))}>remove</button>
                    </div>
                    <div className="card-body text-secondary">
                      <h5 className="card-title">Tenants</h5>
                      <p className="card-text">
                        {/* card inner body */}
                        {allUserName[item.houseKey].map((usersName)=>{
                          return(<p>User: {usersName} 
                          
                            <button className="btn btn-sm btn-warning" onClick={()=>editFillName(item.houseKey, allUserName[item.houseKey].indexOf(usersName))}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={()=>deleteUserOne(item.houseKey, allUserName[item.houseKey].indexOf(usersName))}>Delete</button>
                          </p>)
                        })}
                      </p>
                    </div>
                    {addDataStatus == allUserName[item.houseKey] &&(
                      <p><input type="text" name="name" placeholder="Add Name" value={state.addName} onChange={(event)=>setState({addName: event.target.value})} required/>
                      <button className="btn btn-sm btn-success" onClick={()=>addUserData(item.houseKey)}>Add</button></p>
                    )}
                  </div>
                </div>
              )
            })
          }
      </div>
    </div>

  );
}

export default App;
