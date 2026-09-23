type Props = {
  title:string;
  value:string;
  icon:string;
};


export default function StatCard({
  title,
  value,
  icon
}:Props){

return (

<div
className="
bg-white
rounded-2xl
p-5
shadow-sm
border
border-gray-100
"
>

<div className="
flex
items-center
justify-between
">

<div>

<p className="
text-sm
text-gray-500
">
{title}
</p>


<h3 className="
mt-2
text-3xl
font-bold
text-gray-900
">
{value}
</h3>


</div>


<div
className="
text-3xl
bg-blue-50
rounded-xl
p-3
"
>

{icon}

</div>


</div>

</div>

)

}