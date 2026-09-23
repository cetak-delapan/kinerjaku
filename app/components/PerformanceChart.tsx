"use client";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


export default function PerformanceChart({
data
}:{
data:any[]
}){


return (

<div className="
bg-white
rounded-2xl
border
p-5
shadow-sm
">


<h2 className="
font-bold
text-xl
mb-5
">

Kinerja Bulanan

</h2>



<div className="
h-64
">


<ResponsiveContainer
width="100%"
height="100%"
>


<BarChart
data={data}
>


<XAxis
dataKey="bulan"
/>


<YAxis />


<Tooltip />


<Bar

dataKey="jumlah"

/>


</BarChart>


</ResponsiveContainer>


</div>


</div>

)

}