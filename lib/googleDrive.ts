import { google } from "googleapis";


const auth = new google.auth.GoogleAuth({

credentials:{

client_email:
process.env.GOOGLE_CLIENT_EMAIL,


private_key:
process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,"\n")

},


scopes:[

"https://www.googleapis.com/auth/drive"

]

});



export const drive = google.drive({

version:"v3",

auth

});

export async function createFolder(
name:string,
parentId:string
){


const response = await drive.files.create({

requestBody:{

name,

mimeType:
"application/vnd.google-apps.folder",

parents:[parentId]

},

fields:"id"

});


return response.data.id;

}