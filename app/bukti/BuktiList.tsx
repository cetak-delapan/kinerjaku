"use client";

import { useState } from "react";
import BuktiCard from "./BuktiCard";


export default function BuktiList({
data
}:{
data:any[]
}){


const [tahun,setTahun]=useState("2026");

const [bulan,setBulan]=useState("");


const filteredData=data.filter(item=>{


const tanggal =
new Date(item.activities?.tanggal);



const cocokTahun =
tanggal.getFullYear()
.toString()
===
tahun;



const cocokBulan =
bulan
?
tanggal.getMonth()+1 === Number(bulan)
:
true;



return cocokTahun && cocokBulan;


});



return (

<div>


<div className="
grid
grid-cols-2
gap-3
mb-6
">


<select

className="
border
rounded-xl
p-3
"

value={tahun}

onChange={(e)=>setTahun(e.target.value)}

>

<option value="2026">
2026
</option>

</select>



<select

className="
border
rounded-xl
p-3
"

value={bulan}

onChange={(e)=>setBulan(e.target.value)}

>


<option value="">
Semua Bulan
</option>


<option value="1">
Januari
</option>


<option value="2">
Februari
</option>


<option value="3">
Maret
</option>


<option value="4">
April
</option>


<option value="5">
Mei
</option>


<option value="6">
Juni
</option>


<option value="7">
Juli
</option>


<option value="8">
Agustus
</option>


<option value="9">
September
</option>


<option value="10">
Oktober
</option>


<option value="11">
November
</option>


<option value="12">
Desember
</option>


</select>


</div>




<div className="
space-y-4
">


{

filteredData.map(item=>(

<BuktiCard

key={item.id}

item={item}

/>

))

}


</div>


</div>

)

}