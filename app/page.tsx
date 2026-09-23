import { supabase } from "@/lib/supabase";
import PerformanceChart from "@/app/components/PerformanceChart";


export default async function Home(){


const today = new Date()
.toISOString()
.split("T")[0];



const firstDay = new Date();

firstDay.setDate(1);


const startMonth =
firstDay.toISOString().split("T")[0];



// ======================
// AKTIVITAS HARI INI
// ======================

const {count:todayCount}=await supabase

.from("activities")

.select("*",{count:"exact",head:true})

.eq("tanggal",today);




// ======================
// AKTIVITAS BULAN INI
// ======================

const {count:monthCount}=await supabase

.from("activities")

.select("*",{count:"exact",head:true})

.gte("tanggal",startMonth);




// ======================
// TOTAL BUKTI
// ======================

const {count:evidenceCount}=await supabase

.from("evidences")

.select("*",{count:"exact",head:true});




// ======================
// TOTAL TARGET SKP
// ======================

const {data:tasks}=await supabase

.from("tasks")

.select("target");



const totalTarget =
tasks?.reduce(
(sum,item)=>sum+(item.target || 0),
0
) || 0;





// ======================
// TOTAL REALISASI
// ======================

const {count:realization}=await supabase

.from("activities")

.select("*",{count:"exact",head:true});



const progress =
totalTarget > 0

?

Math.round(
((realization || 0)/totalTarget)*100
)

:

0;





// ======================
// PROGRESS PER URAIAN
// ======================

const {data:taskProgress}=await supabase

.from("tasks")

.select(`

id,

uraian_tugas,

target,

activities(
id
)

`)

.order("id");




const progressData = taskProgress

?.map(task=>{


const realisasi =
task.activities?.length || 0;



const persen =

task.target

?

Math.min(

Math.round(

(realisasi / task.target) * 100

),

100

)

:

0;



return {

nama:task.uraian_tugas,

target:task.target,

realisasi,

persen

};


})

.filter(item=>item.realisasi > 0);





// ======================
// AKTIVITAS TERBARU
// ======================


const {data:recentActivities}=await supabase

.from("activities")

.select(`

id,

tanggal,

tasks(
    uraian_tugas
),

task_breakdowns(
    nama_bukti
)

`)

.order("created_at",{ascending:false})

.limit(5);





// ======================
// GRAFIK BULANAN
// ======================


const {data:monthlyActivities}=await supabase

.from("activities")

.select("tanggal");



const monthlyData = [

"Jan",
"Feb",
"Mar",
"Apr",
"Mei",
"Jun",
"Jul",
"Agu",
"Sep",
"Okt",
"Nov",
"Des"

].map((bulan,index)=>{


const jumlah =

monthlyActivities?.filter(item=>{


const date =
new Date(item.tanggal);



return date.getMonth()===index;


}).length || 0;



return {

bulan,

jumlah

};


});





return (

<main className="
p-5
pb-32
max-w-xl
mx-auto
">


<h1 className="
text-3xl
font-bold
mb-6
">

KinerjaKu

</h1>




{/* BUTTON TAMBAH */}

<a

href="/activities/new"

className="
block
bg-blue-600
text-white
text-center
py-3
rounded-2xl
font-semibold
mb-6
"

>

+ Tambah Kinerja

</a>





{/* CARD */}

<div className="
grid
grid-cols-2
gap-4
">


<Card

title="Hari Ini"

value={`${todayCount || 0} aktivitas`}

/>



<Card

title="Bukti"

value={`${evidenceCount || 0} file`}

/>



<Card

title="Bulan Ini"

value={`${monthCount || 0} aktivitas`}

/>



<Card

title="Progress"

value={`${progress}%`}

/>


</div>






{/* GRAFIK */}

<div className="
mt-8
">


<PerformanceChart

data={monthlyData}

/>


</div>







{/* PROGRESS SKP */}

<div className="
mt-8
">


<h2 className="
text-xl
font-bold
mb-4
">

Progress SKP

</h2>




<div className="
space-y-4
">


{

progressData?.map((item,index)=>(


<div

key={index}

className="
bg-white
border
rounded-2xl
p-4
shadow-sm
"

>


<div className="
flex
justify-between
gap-3
mb-3
">


<p className="
font-semibold
text-sm
">

{item.nama}

</p>



<span className="
text-blue-600
font-bold
">

{item.persen}%

</span>


</div>




<div className="
w-full
bg-gray-200
rounded-full
h-3
">


<div

className="
bg-blue-600
h-3
rounded-full
"

style={{

width:`${item.persen}%`

}}

/>


</div>




<p className="
text-xs
text-gray-500
mt-2
">

{item.realisasi} / {item.target} selesai

</p>


</div>


))

}



{

(!progressData || progressData.length===0)

&&

<p className="
text-gray-500
">

Belum ada aktivitas

</p>

}


</div>


</div>







{/* AKTIVITAS TERBARU */}

<div className="
mt-8
">


<h2 className="
text-xl
font-bold
mb-4
">

Aktivitas Terbaru

</h2>



<div className="
space-y-3
">


{

recentActivities?.map((item)=>(


<div

key={item.id}

className="
bg-white
border
rounded-2xl
p-4
"

>


<p className="
text-sm
text-gray-500
">

{item.tanggal}

</p>



<h3 className="
font-semibold
mt-1
">

{item.tasks?.[0]?.uraian_tugas}

</h3>



<p className="
text-blue-600
text-sm
">

{item.task_breakdowns?.[0]?.nama_bukti}

</p>


</div>


))

}


</div>


</div>




</main>

)

}





function Card({

title,

value

}:{

title:string,

value:string

}){


return (

<div

className="
bg-white
rounded-2xl
p-5
shadow-sm
border
"

>


<p className="
text-gray-500
text-sm
">

{title}

</p>



<h2 className="
text-2xl
font-bold
mt-2
">

{value}

</h2>



</div>

)

}