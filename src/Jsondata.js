import React, { useEffect, useState } from 'react'
import Hexapi from './usefulcomps/HexAPI/Hexapi'


const Jsondata = () => {
    const[api,setapi]=useState({})
    const[data,setdata]=useState([])
        useEffect(()=>{
            const fetchData = async () => {
              try {
                const response = await fetch('/data.json');
                const jsondata= await response.json()
                setapi(jsondata.Apipathurl                )
                console.log(jsondata,"--------")
              } catch (error) {
                console.log(error)
              }
            }
            fetchData()
          },[])


          const fetchBranchNames = async () => {
            const obj = {
              Apipathurl:api,
              query: `[dbo].[spasofware_web_proc_module_view_membership_branchname_getdata]`,
              queryArr: []
            };
            try {
                // console.log(api+obj,"-----------")
              const getData = await Hexapi(obj);
              console.log(getData,"------------")
              setdata(getData.branch)

            } catch (error) {
              console.log(error,"error")
            }
          };
          useEffect(()=>{
            fetchBranchNames();
          })

  return (
    <div>
      <div>Json data</div>
      <br></br>
{data.map((e,i)=>{
  return(
    <div>


      {i+1} --- {e.branchname}</div>
  )
})}
    </div>
  )
}

export default Jsondata