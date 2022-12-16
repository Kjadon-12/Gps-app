import React, { useEffect , useState} from 'react'
import PieChart from './PieChart'

import { useLocation } from 'react-router-dom'


function GpsDetail(props) {
    const location = useLocation()
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
    const id = location.state.id
    let arr =[];

    

    const [device, setDevice] = useState([])
    useEffect(() => {
        const getData = async () => {
            const res = await fetch('http://localhost:5002/all/data')
            const data = await res.json();
            setDevice(data)
        }
        getData();
    },[])

    for(let i=0;i<device.length;i++){
    
        if(device[i].DeviceId===id){
            arr.push(device[i])
        }
    }

    return (
        <div>
           

            <div className='title2'>
            <h1>{location.state.id}</h1>
            <h1>{location.state.name}</h1>
            </div>


            <div className='tableP'>
            <table className='detailTable'>
                <thead>
                    <tr>

                        <th> TimeStamp</th>
                        <th> Location</th>

                    </tr>
                </thead>
                <tbody>
                    {

                        arr.map((item, index) => (
                            <tr key={index}>
                            
                                <td>{new Date(item.Time).toLocaleDateString(undefined, options)}</td>
                                <td>{item.Location}</td>

                            </tr>
                        ))
                    }



                </tbody>
            </table>
            </div>
            <div className='pie'>
            <PieChart arr={arr}/>
</div>
            
            



        </div>
    )
}

export default GpsDetail