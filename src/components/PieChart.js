import React  from "react";
import  Chart  from "react-apexcharts";
function Piechart(props){


    const arr = props.arr;
    var titleP =[];
    var valueP = [];

   
   let map = new Map();
   for (let i = 0; i < arr.length; i++) {
    
           if (map.has(arr[i].Location)) {

               map.set(arr[i].Location, (map.get(arr[i].Location)) + 1)
         }
           else {
               map.set(arr[i].Location, 1)
           
       }
   } 

   for (let [key, value] of map) {
    titleP.push(key)
    valueP.push(parseInt(value))


}
     

       return(
        <>
            <div >

                <h5 className="timeD">% Time spent on each location</h5>
                     
            
                <Chart 
                type="pie"
                width={900}
                height={340}

                series={ valueP }                

                options={{
                        title:{ text:""
                        } , 
                       noData:{text:"Empty Data"},                        
                      // colors:["#f90000","#f0f"],
                      labels:titleP                     

                 }}
                >
                </Chart>
            </div>
        </>
    );
}
export default Piechart;