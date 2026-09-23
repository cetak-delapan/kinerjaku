import { supabase } from "@/lib/supabase";
import BuktiList from "./BuktiList";


export const dynamic = "force-dynamic";


export default async function BuktiPage(){


const {
data,
error

}=await supabase

.from("evidences")

.select(`
    *,
    activities(
        tanggal,
        tasks(
            uraian_tugas
        )
    ),
    task_breakdowns(
        nama_bukti
    )
`)

.order(
"created_at",
{
ascending:false
}

);





if(error){

console.error(
"ERROR LOAD EVIDENCE:",
error
);

}




return (

<main

className="
p-5
pb-32
max-w-xl
mx-auto
"

>


<h1

className="
text-2xl
font-bold
mb-6
"

>

Bukti Kinerja Saya

</h1>





<div

className="
space-y-4
"

>


<BuktiList

data={data || []}

/>


</div>



</main>

)

}