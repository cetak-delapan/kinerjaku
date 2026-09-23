import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(req:any){


const token = await getToken({

req,

secret: process.env.NEXTAUTH_SECRET

});



const pathname = req.nextUrl.pathname;



const protectedRoutes = [

"/dashboard",

"/bukti",

"/activities",

"/setting"

];



const isProtected = protectedRoutes.some(

(route)=>pathname.startsWith(route)

);





// Belum login
if(isProtected && !token){


return NextResponse.redirect(

new URL("/login",req.url)

);


}





// Sudah login tapi buka login

if(pathname === "/login" && token){


return NextResponse.redirect(

new URL("/dashboard",req.url)

);


}



return NextResponse.next();


}



export const config = {


matcher:[

"/dashboard/:path*",

"/bukti/:path*",

"/activities/:path*",

"/setting/:path*",

"/login"

]


};