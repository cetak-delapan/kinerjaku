"use client";

import { useState } from "react";



export default function BuktiCard({

item

}:{

item:any

}){


const [open,setOpen] = useState(false);
const [toast,setToast] = useState<string | null>(null);



const copyLink = async()=>{


let data;


try{

data =
JSON.parse(item.drive_url);

}

catch{

data={
url:item.drive_url
};

}



await navigator.clipboard.writeText(

data.url

);



setToast(
"Link berhasil disalin"
);



setTimeout(()=>{

setToast(null);

},2500);



}





let driveData:any={};


try{

driveData =
JSON.parse(item.drive_url);

}

catch{

driveData={

url:item.drive_url,

type:item.file_type,

id:null

};

}




const isImage =
driveData.type?.startsWith(
"image/"
);



return (

<>


<div

className="
bg-white
rounded-2xl
border
p-5
shadow-sm
"

>


<p className="text-sm text-gray-500">

{item.activities?.tanggal}

</p>



<h2 className="font-bold mt-2">

{item.activities?.tasks?.uraian_tugas}

</h2>




<p className="text-blue-600 mt-2">

{item.task_breakdowns?.nama_bukti}

</p>




<p className="text-sm text-gray-500">

File: {item.nama_file}

</p>




<button

onClick={()=>setOpen(true)}

className="
block
mt-4
bg-blue-600
text-white
py-2
rounded-xl
w-full
"

>

Lihat Bukti

</button>




<button

onClick={copyLink}

className="
mt-3
w-full
border
border-blue-600
text-blue-600
py-2
rounded-xl
"

>

Copy Link

</button>



</div>





{
open && (


<div

className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
p-5
"

onClick={()=>setOpen(false)}

>



<div

className="
bg-white
rounded-2xl
w-full
max-w-lg
p-4
"

onClick={(e)=>e.stopPropagation()}

>



<div

className="
flex
justify-between
items-center
mb-4
"

>


<h3 className="font-bold">

Preview Bukti

</h3>



<button

onClick={()=>setOpen(false)}

className="
text-red-500
font-bold
"

>

Tutup

</button>


</div>





{

isImage

?

<img

src={
`https://drive.google.com/thumbnail?id=${driveData.id}&sz=w1000`
}

className="
rounded-xl
w-full
max-h-[600px]
object-contain
"

/>



:

<iframe

src={

driveData.url.replace(
"/view",
"/preview"
)

}

className="
w-full
h-[600px]
rounded-xl
"

/>


}




</div>


</div>


)

}

{
toast &&

<div

className="
fixed
top-5
left-1/2
-translate-x-1/2
bg-green-600
text-white
px-5
py-3
rounded-xl
shadow-lg
z-[100]
font-semibold
"

>

✅ {toast}

</div>

}

</>

)

}