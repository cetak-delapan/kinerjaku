import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Search } from "lucide-react";


export default async function Tasks(){


const {data:tasks,error}=await supabase
.from("tasks")
.select("*")
.order("id");


if(error){

return (
<div className="p-6">
Gagal mengambil data
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


<div className="mb-6">

<h1 className="
text-3xl
font-bold
">
Uraian Tugas
</h1>


<p className="
text-gray-500
mt-1
">
Daftar SKP aktif tahun 2026
</p>

</div>




<div className="
bg-white
rounded-2xl
p-4
flex
items-center
gap-3
border
">

<Search
size={20}
className="text-gray-400"
/>


<input

placeholder="Cari uraian tugas..."

className="
outline-none
w-full
"

/>


</div>




<div className="
mt-6
space-y-4
">


{
tasks?.map((task)=>{


return (

<div
key={task.id}
className="
bg-white
rounded-2xl
p-5
shadow-sm
border
"
>


<div className="
flex
justify-between
gap-3
">


<h2 className="
font-semibold
leading-relaxed
">

{task.uraian_tugas}

</h2>


<span
className="
bg-blue-50
text-blue-600
text-xs
px-3
py-1
rounded-full
h-fit
"
>

SKR {task.skr}

</span>


</div>



<div className="
grid
grid-cols-2
gap-3
mt-5
">


<div
className="
bg-slate-50
rounded-xl
p-3
"
>

<p className="text-xs text-gray-500">
Target
</p>

<p className="font-semibold">
{task.target} kali/tahun
</p>


</div>



<div
className="
bg-slate-50
rounded-xl
p-3
"
>

<p className="text-xs text-gray-500">
Tahun
</p>

<p className="font-semibold">
{task.tahun}
</p>


</div>


</div>




<Link

href={`/tasks/${task.id}`}

className="
block
mt-5
text-center
border
border-blue-600
text-blue-600
rounded-xl
py-2
text-sm
font-medium
"

>

Lihat Detail

</Link>



</div>


)

})
}



</div>


</div>

</main>

)

}