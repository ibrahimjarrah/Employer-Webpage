import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';





export default function Table() {

    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'jobTitle',
            headerName: 'Job Title',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            
    
        },
        {
            field: 'editEmployee',
            headerName: 'Edit',
            renderCell:(params)=>{
                return(
                    <EditIcon onClick={()=>{editEmployee(params.row._id)}}/>
                );    

            }
            
    
        },
        {
            field:'delete',
            headerName:' Delete Item',
            renderCell: (params) => {
                return (
                    <DeleteIcon onClick={() => {deleteEmployee(params.row._id)}}/>                
                );
            }
        }
    ];
    const deleteRow = (id ) => {
        setData(data.filter((item)=>item._id !== id));
    }
    async function deleteEmployee(employeeId){
        // const res = await axios.delete(`http://localhost:5050/employees/:${employeeId}`)
        const res = await axios.delete(`http://localhost:5050/employees/${employeeId}`,
            {

                'headers': {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                }
            }).then(
                
                deleteRow(employeeId)
            );
            
    }

    

     function editEmployee(employeeId){
        // const res = await axios.delete(`http://localhost:5050/employees/:${employeeId}`)
        // const res = await axios.put(`http://localhost:5050/employees/${employeeId}`,
        //     {
        //         'headers': {
        //             'Content-Type': 'application/json; charset=utf-8',
        //             'Access-Control-Allow-Origin': '',
        //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        //         }
        //     })
                 
                    navigate("/edit",{state:{id:34,name:26}});
                    console.log('hey')
           
            // console.log(res)
    }



    let [data, setData] = useState([]);



    async function getEmployees() {
        const res = await axios.get(`http://localhost:5050/employees`,
            {
                'headers': {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                }
            });
        // console.log(res.data);
        return res.data;
    }
    let navigate = useNavigate();
     async function goToSignUp(){
        
         await navigate("/signup");
    }
    useEffect(() => {
       getEmployees().then((res)=>{
        setData(res)
       })
      },[]);

    //   s

    
    
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                
                rows={data}
                getRowId={(row) => row._id}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            {/* <button onClick={getEmployees}>
        sadas
      </button> */}
        
       <button onClick={goToSignUp}>Add user</button>
        </div>
    );
}
