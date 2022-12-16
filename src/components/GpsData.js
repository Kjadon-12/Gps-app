import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vector from '../Vector.png'
//import GpsDetail from "./GpsDetail";
import Pagination from "./Pagination";






function GpsData() {
    const navigate = useNavigate()
    const [filterValue , setfilterValue] = useState('')
    const [device, setDevice] = useState([]);
    

    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(5)
    const totalPages = Math.ceil(device.length/dataPerPage);
    //const [currentData, setCurrentData] = useState([])

    const [searchItem, setSearchItem] = useState([])
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }

    useEffect(() => {


        const getData = async () => {
            const res = await fetch('http://localhost:5002')
            const data = await res.json();
            setDevice(data)
            setSearchItem(data)
            //console.log(data)
        }
        getData();

    }, [])

    const filterHandler = (e)=>{
        if(e.target.value=== ''){
            setDevice(searchItem)
        }
        else{
           const filRes =  searchItem.filter(item => item.DeviceId.toLowerCase().includes(e.target.value.toLowerCase()) || item.DeviceType.toLowerCase().includes(e.target.value.toLowerCase()))
           setDevice(filRes)
            
        }
        setfilterValue(e.target.value)
}
    //=======
        const lastData = currentPage * dataPerPage;
        const firstData = lastData - dataPerPage
        const currentData = device.slice(firstData, lastData)
    
    const nextHandler = ()=>{
    
        if(currentPage< totalPages){
            setCurrentPage(currentPage+1)
            
            
        }
    }
    const previousHandler = ()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }

    const move = (e,x,y)=>{
        e.preventDefault()
       navigate('/gps/detail',{state:{id:x, name:y}} )
       //console.log(x)
    }

    
    

    return (
        <>

            <div>
                <h2 className="title">GPS Summary</h2>
                <input placeholder="      Search by Device Id/ Type" className="search-box" value={filterValue} onChange={(e)=>filterHandler(e)}></input>
                <Pagination className="pagination" totalPages={totalPages} nextHandler={nextHandler} previousHandler={previousHandler} dataPerPage={dataPerPage}  currentPage={currentPage}/>
                <br />
                <br />
                <div className="tabl">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th>DeviceId</th>
                                <th>DeviceType</th>
                                <th>Latest TimeStamp</th>
                                <th>Latest Location</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.DeviceId}</td>

                                        <td>{item.DeviceType}</td>
                                        <td>{new Date(item.Time).toLocaleDateString(undefined, options)}</td>
                                        <td>{item.location}</td>
                                        <td><button onClick={(e)=>move(e,item.DeviceId, item.DeviceType)} ><img src={vector} alt="img"></img></button> </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )



}


export default GpsData;