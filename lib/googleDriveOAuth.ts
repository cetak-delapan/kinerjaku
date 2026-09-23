import { google } from "googleapis";



export function getDriveClient(
accessToken:string
){


if(!accessToken){

throw new Error(
"Access token kosong"
);

}



const auth =
new google.auth.OAuth2();



auth.setCredentials({

access_token:accessToken

});



return google.drive({

version:"v3",

auth

});


}






export async function findFolder(

drive:any,

name:string,

parentId:string

){


const response =
await drive.files.list({

q:

`
name='${name}'
and '${parentId}' in parents
and mimeType='application/vnd.google-apps.folder'
and trashed=false
`,


fields:"files(id,name)"

});



return response.data.files?.[0]?.id || null;


}






export async function getOrCreateFolder(

drive:any,

name:string,

parentId:string

){


const existing =

await findFolder(

drive,

name,

parentId

);



if(existing){

return existing;

}



const folder =

await drive.files.create({

requestBody:{

name,

mimeType:
"application/vnd.google-apps.folder",

parents:[parentId]

},


fields:"id"

});



return folder.data.id;


}







export async function uploadToDrive(

drive:any,

file:File,

folderId:string

){



const buffer =

Buffer.from(

await file.arrayBuffer()

);





// ======================
// GENERATE FILE NAME
// ======================


const now = new Date();



const timestamp =

now.toISOString()

.replace(/[-:]/g,"")

.replace("T","_")

.split(".")[0];




const cleanFileName =

file.name

.replace(

/[^a-zA-Z0-9._-]/g,

"_"

);




const newFileName =

`${timestamp}_${cleanFileName}`;







const uploaded =

await drive.files.create({

requestBody:{


name:newFileName,


parents:[folderId]


},


media:{


mimeType:file.type,


body:

require("stream")

.Readable

.from(buffer)


},


fields:"id"


});






const fileId =

uploaded.data.id;







await drive.permissions.create({

fileId,


requestBody:{


role:"reader",


type:"anyone"


},


sendNotificationEmail:false,


fields:"id"

});







return JSON.stringify({

id:fileId,

name:newFileName,

type:file.type,

url:

`https://drive.google.com/file/d/${fileId}/view`

});


}