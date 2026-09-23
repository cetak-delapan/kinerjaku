"use client";

import { signIn } from "next-auth/react";


export default function LoginPage(){


return (

<main

className="
min-h-screen
flex
items-center
justify-center
p-5
"

>


<div

className="
w-full
max-w-sm
bg-white
rounded-3xl
border
p-8
shadow-sm
text-center
"

>


<h1

className="
text-3xl
font-bold
mb-3
"

>

KinerjaKu

</h1>



<p

className="
text-gray-500
mb-8
"

>

Kelola kinerja dan bukti kegiatan dengan mudah

</p>




<button

onClick={()=>signIn("google")}

className="
w-full
bg-blue-600
text-white
py-3
rounded-xl
font-semibold
"

>

Login dengan Google

</button>



<p

className="
text-xs
text-gray-400
mt-6
"

>

Gunakan akun Google yang terdaftar

</p>



</div>


</main>

)

}