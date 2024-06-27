import React, { useEffect } from 'react'

const Jsondata = () => {
        useEffect(()=>{
            const fetchData = async () => {
              try {
                const response = await fetch('/data.json');
                console.log(response,"---------")
              } catch (error) {
                console.log(error)
              }
            }
            fetchData()
          },[])

  return (
    <div>Jsondata</div>
  )
}

export default Jsondata