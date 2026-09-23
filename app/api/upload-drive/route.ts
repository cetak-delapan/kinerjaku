import {NextResponse} from "next/server";

import {
getDriveClient,
getOrCreateFolder,
uploadToDrive
}
from "@/lib/googleDriveOAuth";



export async function POST(
request:Request
){


try{


const formData =
await request.formData();



const file =
formData.get("file") as File;

if(!file){

return NextResponse.json({

error:"File tidak ditemukan"

},{
status:400
});

}



const maxSize =
10 * 1024 * 1024;



if(file.size > maxSize){

return NextResponse.json({

error:"Ukuran file maksimal 10 MB"

},{
status:400
});

}

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



if(!allowedTypes.includes(file.type)){


return NextResponse.json({

error:"Format file tidak didukung"

},{
status:400
});


}



const tahun =
formData.get("tahun") as string;



const bulan =
formData.get("bulan") as string;



const tugas =
formData.get("tugas") as string;



const accessToken =
formData.get("accessToken") as string;



if(!accessToken){

return NextResponse.json({

error:"Belum login Google"

},

{
status:401
}

);

}



const drive =
getDriveClient(accessToken);


const rootFolder =
process.env.GOOGLE_DRIVE_FOLDER_ID!;



const tahunFolder =
await getOrCreateFolder(

drive,

tahun,

rootFolder

);



const bulanFolder =
await getOrCreateFolder(

drive,

bulan,

tahunFolder

);



const tugasFolder =
await getOrCreateFolder(

drive,

tugas,

bulanFolder

);



const result =
await uploadToDrive(
drive,
file,
tugasFolder
);


return NextResponse.json(

JSON.parse(result)

);



}

catch(error:any){


console.error(
"UPLOAD DRIVE ERROR:",
error
);



return NextResponse.json({

error:error.message,

details:error.response?.data || null

},

{

status:500

}

);


}

}