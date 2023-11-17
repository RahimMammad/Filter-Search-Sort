import React, { useEffect, useState} from 'react'
import axios from 'axios'
import Item from './Item'

const List=() => {
    const [data, setData] = useState([]);
    const [filteredData,setFilteredData] = useState([]);

    useEffect(()=>{
        
        const fetchData = async () => {
            try {
                const response = await axios.get("https://northwind.vercel.app/api/products")
                // console.log(response.data);
                setData(response.data)
                setFilteredData(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    const handleChange = (inputVal)=>{
        if(inputVal == " "){
            setData([...data])
        }
        else{
            setFilteredData([...data.filter((item)=> item.name.trim().toLowerCase().includes(inputVal.trim().toLowerCase()))])
        }
    }

    const handleFilterChange = (inputVal) => {
        if (inputVal === '') {
            setFilteredData([...data]);
        } else {
            const inputNumber = parseFloat(inputVal);
            const filteredByPrice = data.filter(
                (item) => item.unitPrice < inputNumber
            );
            setFilteredData(filteredByPrice);
        }
    };

    const handleClickToHigh = (e) => {
        e.preventDefault()
        const sortedData = [...data.sort((a,b)=>a.unitPrice-b.unitPrice)]
        setData(sortedData)
    }

    const handleClickToLow = (e) => {
        e.preventDefault()
        const sortedData = [...data.sort((a,b)=>b.unitPrice-a.unitPrice)]
        setData(sortedData)
    }

  return (
    <div className="container">
        <div>
        <input type="text" placeholder='Search...' onChange={(e)=>{
            handleChange(e.target.value)
        }}/><br /><br />
        <input type="text" placeholder='Filter...' onChange={(e) => handleFilterChange(e.target.value)} /><br /><br />
        <button onClick={(e) => handleClickToHigh(e)}>Sort By Price from Low To High</button>
        <button onClick={(e) => handleClickToLow(e)}>Sort By Price from High To Low</button><br />
        </div>
        <div>
            {
              filteredData &&  filteredData.map((item,index)=>{
                    return(
                        <ul>
                            <Item item={item} key={index}/>
                        </ul>
                    )
                })
            }
        </div>
    </div>
  )
}

export default List