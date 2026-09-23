import { supabase } from "@/lib/supabase";
import Link from "next/link";


export default async function TaskDetail({
params,
}:{
params: Promise<{id:string}>
}){


const {id} = await params;

const taskId = Number(id);



const {data:task,error}=await supabase
.from("tasks")
.select("*")
.eq("id",taskId)
.single();



const {data:breakdowns}=await supabase
.from("task_breakdowns")
.select("*")
.eq("task_id",taskId)
.order("nomor");



if(error || !task){

return(

<div className="p-6">

<h1>
Tugas tidak ditemukan
</h1>

<pre className="mt-5">
{JSON.stringify(error,null,2)}
</pre>

</div>

)

}



return (

<main className="
min-h-screen
bg-slate-50
p-5
pb-28
">


<div className="
max-w-xl
mx-auto
">


{/* Header */}

<div>

<h1 className="
text-2xl
font-bold
leading-relaxed
">

{task.uraian_tugas}

</h1>



<div className="
flex
gap-3
mt-4
">


<span
className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
text-sm
"
>

SKR {task.skr}

</span>


<span
className="
bg-gray-100
px-3
py-1
rounded-full
text-sm
"
>

Target {task.target}

</span>


</div>


</div>





{/* Breakdown */}

<div className="
mt-6
">


<h2 className="
text-xl
font-bold
mb-4
">

Bukti Kinerja

</h2>



<div className="
space-y-4
">


{
breakdowns?.map((item)=>(


<div

key={item.id}

className="
bg-white
rounded-2xl
p-5
border
shadow-sm
"

>


<div className="
flex
gap-3
"
>


<div
className="
bg-blue-100
text-blue-700
w-8
h-8
rounded-full
flex
items-center
justify-center
font-bold
"
>

{item.nomor}

</div>


<div>

<h3 className="
font-semibold
">

{item.nama_bukti}

</h3>


<p className="
text-sm
text-gray-500
mt-1
">

{item.aktivitas}

</p>


</div>


</div>





<Link

href={`/activities/new?task=${task.id}&breakdown=${item.id}`}

className="
mt-4
block
text-center
rounded-xl
bg-blue-600
text-white
py-3
text-sm
font-semibold
"

>

+ Upload Bukti

</Link>


</div>


))

}



</div>


</div>




</div>


</main>

)

}