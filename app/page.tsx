import { supabase } from "@/lib/supabase";
import { getAuthSession } from "@/lib/auth";
import {
  CalendarDays,
  FileCheck,
  Activity,
  Target
} from "lucide-react";


export const revalidate = 30;



export default async function Home(){

const session = await getAuthSession();



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

(sum,item)=>

sum+(item.target || 0),

0

) || 0;





// ======================
// REALISASI
// ======================

const {count:realization}=await supabase

.from("activities")

.select("*",{count:"exact",head:true});




const progress =

totalTarget > 0

?

Math.round(

((realization || 0) / totalTarget) * 100

)

:

0;






// ======================
// PROGRESS PER TUGAS
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






return (

<main

className="
p-5
pb-32
max-w-xl
mx-auto
"

>



<div

className="
bg-gradient-to-r
from-blue-600
to-blue-500
rounded-3xl
p-6
text-white
mb-6
shadow-lg
"

>


<div

className="
flex
items-center
gap-4
"

>


<img

src={
session?.user?.image ||
"https://ui-avatars.com/api/?name=User"
}

className="
w-14
h-14
rounded-full
border-2
border-white
object-cover
"

/>



<div>


<p

className="
text-sm
opacity-90
"

>

Selamat datang 👋

</p>



<h1

className="
text-xl
font-bold
"

>

{session?.user?.name || "Pengguna"}

</h1>



</div>


</div>




<p

className="
mt-5
text-sm
opacity-90
"

>

KinerjaKu

</p>




<p

className="
text-xs
opacity-80
"

>

Pantau aktivitas dan progres SKP Anda

</p>



</div>






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







<div

className="
grid
grid-cols-2
gap-4
"

>


<StatCard

title="Hari Ini"

value={todayCount || 0}

label="Aktivitas"

icon={CalendarDays}

color="blue"

/>




<StatCard

title="Bukti"

value={evidenceCount || 0}

label="File"

icon={FileCheck}

color="green"

/>




<StatCard

title="Bulan Ini"

value={monthCount || 0}

label="Aktivitas"

icon={Activity}

color="purple"

/>




<StatCard

title="Progress"

value={progress}

label="%"

icon={Target}

color="orange"

/>


</div>






<div className="mt-8">


<h2

className="
text-xl
font-bold
mb-4
"

>

Progress SKP

</h2>




<div className="space-y-4">


{

progressData?.map((item,index)=>(


<div

key={index}

className="
bg-white
rounded-3xl
p-5
shadow-sm
border
border-gray-100
"

>


<div

className="
flex
justify-between
items-start
mb-4
"

>


<div>


<p

className="
font-semibold
text-gray-800
text-sm
"

>

{item.nama}

</p>



<p

className="
text-xs
text-gray-500
mt-1
"

>

{item.realisasi} dari {item.target} selesai

</p>


</div>





<span

className={`

text-xs

font-semibold

px-3

py-1

rounded-full

${

item.persen >= 100

?

"bg-green-100 text-green-700"

:

item.persen >= 50

?

"bg-blue-100 text-blue-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

>

{

item.persen >= 100

?

"Selesai"

:

item.persen >= 50

?

"Berjalan"

:

"Mulai"

}

</span>



</div>
// progress bar

<div

className="
w-full
bg-gray-100
rounded-full
h-3
overflow-hidden
"

>


<div

className={`

h-3

rounded-full

transition-all

duration-700

${

item.persen >= 100

?

"bg-green-500"

:

"bg-blue-600"

}

`}

style={{

width:`${item.persen}%`

}}

/>


</div>





<div

className="
text-right
mt-2
"

>


<span

className="
font-bold
text-blue-600
"

>

{item.persen}%

</span>


</div>



</div>


))


}



{


(!progressData || progressData.length===0)

&&

<p

className="
text-gray-500
"

>

Belum ada aktivitas

</p>


}



</div>


</div>









{/* AKTIVITAS TERBARU */}


<div

className="
mt-8
"

>


<h2

className="
text-xl
font-bold
mb-4
"

>

Aktivitas Terbaru

</h2>




<div

className="
space-y-3
"

>


{


recentActivities?.map((item)=>(


<div

key={item.id}

className="
bg-white
rounded-3xl
border
border-gray-100
p-5
shadow-sm
"

>


<div

className="
flex
justify-between
items-center
"

>


<p

className="
text-sm
text-gray-500
"

>

{item.tanggal}

</p>



<div

className="
w-2
h-2
rounded-full
bg-blue-600
"

></div>


</div>





<h3

className="
font-semibold
mt-3
"

>

{item.tasks?.[0]?.uraian_tugas}

</h3>





<p

className="
text-blue-600
text-sm
mt-2
"

>

{item.task_breakdowns?.[0]?.nama_bukti}

</p>



</div>


))


}




{

(!recentActivities || recentActivities.length===0)

&&

<p

className="
text-gray-500
"

>

Belum ada aktivitas

</p>


}



</div>


</div>






</main>

)

}







function StatCard({

title,

value,

label,

icon:Icon,

color

}:{

title:string,

value:number,

label:string,

icon:any,

color:string

}){


const colors:any={


blue:

"bg-blue-100 text-blue-600",



green:

"bg-green-100 text-green-600",



purple:

"bg-purple-100 text-purple-600",



orange:

"bg-orange-100 text-orange-600"



};



return (


<div

className="
bg-white
rounded-3xl
p-5
shadow-sm
border
border-gray-100
"

>


<div

className={`

w-11

h-11

rounded-2xl

flex

items-center

justify-center

mb-4

${colors[color]}

`}

>

<Icon size={22}/>

</div>




<p

className="
text-gray-500
text-sm
"

>

{title}

</p>





<div

className="
flex
items-end
gap-1
mt-2
"

>


<h2

className="
text-3xl
font-bold
"

>

{value}

</h2>




<span

className="
text-gray-500
mb-1
"

>

{label}

</span>



</div>



</div>


)


}