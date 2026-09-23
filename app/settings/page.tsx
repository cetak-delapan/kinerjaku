"use client";

import { signOut, signIn, useSession } from "next-auth/react";


export default function SettingsPage(){


const {
data:session,
status

}=useSession();

if(status==="loading"){


return (

<main

className="
p-5
text-center
"

>

Memuat akun...


</main>

)

}



const isLogin =
status === "authenticated";




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

Setting

</h1>





{
isLogin

?


<>


{/* PROFIL */}

<div

className="
bg-white
border
rounded-2xl
p-5
shadow-sm
mb-4
"

>


<h2 className="
font-semibold
mb-4
">

Profil

</h2>




<div className="
flex
items-center
gap-4
">


<img

src={
session.user?.image ||
"https://ui-avatars.com/api/?name="+
encodeURIComponent(
session.user?.name || "User"
)
}

className="
w-14
h-14
rounded-full
object-cover
"

/>



<div>


<p className="
font-semibold
">

{session.user?.name}

</p>


<p className="
text-sm
text-gray-500
">

{session.user?.email}

</p>


</div>


</div>



</div>





{/* GOOGLE DRIVE */}

<div

className="
bg-white
border
rounded-2xl
p-5
shadow-sm
mb-4
"

>


<h2 className="
font-semibold
mb-2
">

Google Drive

</h2>


<p className="
text-green-600
text-sm
">

✓ Terhubung

</p>


</div>






{/* LOGOUT */}

<div

className="
bg-white
border
rounded-2xl
p-5
shadow-sm
"

>


<h2 className="
font-semibold
mb-2
">

Akun

</h2>


<p className="
text-sm
text-gray-500
mb-5
">

Keluar dari KinerjaKu

</p>




<button

onClick={()=>signOut({

callbackUrl:"/login"

})}


className="
w-full
bg-red-600
text-white
py-3
rounded-xl
font-semibold
"

>

Logout

</button>



</div>



</>



:

<>


<div

className="
bg-white
border
rounded-2xl
p-5
shadow-sm
"

>


<h2 className="
font-semibold
mb-3
">

Anda belum login

</h2>


<p className="
text-sm
text-gray-500
mb-5
">

Login untuk menggunakan KinerjaKu

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

Login Google

</button>



</div>


</>

}



</main>

)

}