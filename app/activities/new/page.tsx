"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function NewActivityPage(){

const router = useRouter();

const {data:session}=useSession();


const [tasks,setTasks] = useState<any[]>([]);

const [breakdowns,setBreakdowns] = useState<any[]>([]);


const [taskId,setTaskId] = useState("");

const [breakdownId,setBreakdownId] = useState("");


const [tanggal,setTanggal] = useState("");

const [file,setFile] = useState<File | null>(null);


const [isSaving,setIsSaving] = useState(false);



const [toast,setToast] = useState<{
type:"success"|"error",
message:string
}|null>(null);



useEffect(()=>{

if(toast){

const timer=setTimeout(()=>{

setToast(null);

},3000);


return ()=>clearTimeout(timer);

}

},[toast]);



useEffect(()=>{


async function getTasks(){


const {data}=await supabase

.from("tasks")

.select("*")

.order("id");



setTasks(data || []);


}


getTasks();


},[]);





async function getBreakdowns(id:string){


setTaskId(id);



const {data}=await supabase

.from("task_breakdowns")

.select("*")

.eq("task_id",id)

.order("nomor");



setBreakdowns(data || []);


}







async function saveActivity(){


setIsSaving(true);



try{

if(!tanggal){

setToast({

type:"error",

message:"Tanggal belum dipilih"

});

return;

}


if(!taskId){

setToast({

type:"error",

message:"Pilih uraian tugas terlebih dahulu"

});

return;

}


if(!breakdownId){

setToast({

type:"error",

message:"Pilih bukti kinerja terlebih dahulu"

});

return;

}


if(!file){

setToast({

type:"error",

message:"Upload bukti terlebih dahulu"

});

return;

}


if(!file){


setToast({

type:"error",

message:"Upload bukti terlebih dahulu"

});


return;


}





const {data:activity,error}=await supabase

.from("activities")

.insert({

task_id:Number(taskId),

tanggal

})

.select()

.single();




if(error){

throw error;

}





const driveForm = new FormData();



driveForm.append(

"file",

file

);



driveForm.append(

"tahun",

new Date(tanggal)

.getFullYear()

.toString()

);




driveForm.append(

"bulan",

new Date(tanggal)

.toLocaleString(

"id-ID",

{

month:"long"

}

)

);





driveForm.append(

"tugas",

tasks.find(

(item)=>item.id === Number(taskId)

)?.uraian_tugas || "Lainnya"

);





driveForm.append(

"accessToken",

session?.accessToken || ""

);






const driveResponse =

await fetch(

"/api/upload-drive",

{

method:"POST",

body:driveForm

}

);





const driveResult =

await driveResponse.json();





if(!driveResponse.ok){


throw new Error(

driveResult.error || "Upload Drive gagal"

);


}





const {error:evidenceError}=

await supabase

.from("evidences")

.insert({

activity_id:activity.id,

breakdown_id:Number(breakdownId),

nama_file:driveResult.name,

file_type:driveResult.type,

drive_url:JSON.stringify(driveResult)

});





if(evidenceError){

throw evidenceError;

}





setToast({

type:"success",

message:"Kinerja berhasil disimpan"

});




setTimeout(()=>{

router.push("/bukti");

},1000);





}



catch(error:any){



console.error(error);



setToast({

type:"error",

message:error.message || "Gagal menyimpan kinerja"

});




}



finally{


setIsSaving(false);


}


}







return (


<main className="p-5 pb-24 max-w-xl mx-auto">


<h1 className="text-2xl font-bold mb-6">

Tambah Kinerja

</h1>





<label>

Tanggal

</label>


<input

type="date"

className="border p-3 w-full rounded-xl mb-4"

value={tanggal}

onChange={(e)=>setTanggal(e.target.value)}

/>





<label>

Uraian Tugas

</label>



<select

className="border p-3 w-full rounded-xl mb-4"

value={taskId}

onChange={(e)=>getBreakdowns(e.target.value)}

>


<option value="">

Pilih tugas

</option>



{

tasks.map(task=>(


<option

key={task.id}

value={task.id}

>


{task.uraian_tugas}


</option>


))

}


</select>







<label>

Bukti Kinerja

</label>



<select

className="border p-3 w-full rounded-xl mb-4"

value={breakdownId}

onChange={(e)=>setBreakdownId(e.target.value)}

>



<option value="">

Pilih bukti

</option>




{

breakdowns.map(item=>(


<option

key={item.id}

value={item.id}

>


{item.nomor}. {item.nama_bukti}


</option>


))


}


</select>







<label className="block mb-2 font-medium">

Upload Bukti

</label>




<input

type="file"

accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"

className="
border
p-3
rounded-xl
w-full
mb-6
"

onChange={(e)=>{


const selected =
e.target.files?.[0];


if(!selected){

return;

}



const maxSize =
10 * 1024 * 1024;



const allowedTypes=[

"image/jpeg",

"image/png",

"application/pdf",

"application/msword",

"application/vnd.openxmlformats-officedocument.wordprocessingml.document",

"application/vnd.ms-excel",

"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

"application/vnd.ms-powerpoint",

"application/vnd.openxmlformats-officedocument.presentationml.presentation"

];



if(selected.size > maxSize){


setToast({

type:"error",

message:"Ukuran file maksimal 10 MB"

});


e.target.value="";

return;

}



if(!allowedTypes.includes(selected.type)){


setToast({

type:"error",

message:"Format file tidak didukung"

});


e.target.value="";

return;

}



setFile(selected);


}}

/>






<button


disabled={isSaving}



onClick={saveActivity}



className={`

w-full

py-3

rounded-xl

font-semibold

text-white

${

isSaving

?

"bg-gray-400 cursor-not-allowed"

:

"bg-blue-600"

}

`}



>


{

isSaving

?

"⏳ Menyimpan..."

:

"Simpan Kinerja"

}



</button>







{

toast &&


<div

className={`

fixed

top-5

left-1/2

-translate-x-1/2

px-5

py-3

rounded-xl

text-white

shadow-lg

z-50

${

toast.type==="success"

?

"bg-green-600"

:

"bg-red-600"

}

`}


>


{toast.message}


</div>


}



</main>


)


}