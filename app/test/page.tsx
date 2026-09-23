import { supabase } from "@/lib/supabase";


export default async function Test(){

const {data,error}=await supabase
.from("tasks")
.select("*");


return (

<div className="p-5">

<h1>
Data SKP
</h1>


<pre>

{JSON.stringify(
data,
null,
2
)}

</pre>


</div>

)

}