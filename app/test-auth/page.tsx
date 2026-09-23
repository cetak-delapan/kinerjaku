import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function TestAuth(){


const session = await getServerSession(authOptions);



return (

<pre className="p-5">

{JSON.stringify(
session,
null,
2
)}

</pre>

)

}   