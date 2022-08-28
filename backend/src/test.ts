import dotenv from "dotenv"
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

dotenv.config()

const { DO_SPACES_ENDPOINT, DO_SPACES_NAME, DO_SPACES_KEY, DO_SPACES_SECRET } = process.env


const s3Client = new S3Client( {
  endpoint: DO_SPACES_ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
  region: "ams3",
  credentials: {
    accessKeyId: DO_SPACES_KEY || 'missing',
    secretAccessKey: DO_SPACES_SECRET || 'missing',
  }
} )

const params = {
  Bucket: `${ DO_SPACES_NAME }.manufacturer-1.images`,
  Key: "hello-world.txt",
  Body: "Hello Guido!",
  ACL: "public-read",
  Metadata: { // Defines metadata tags.
    "x-amz-meta-my-key": "your-value"
  }
}

export const uploadObject = async () => {
  try {
    const data = await s3Client.send( new PutObjectCommand( params ) )
    console.log(
      "Successfully uploaded object: " +
      params.Bucket +
      "/" +
      params.Key
    )
    return data
  } catch ( err ) {
    console.log( "Error", err )
  }
}


// Step 5: Call the uploadObject function.
// uploadObject()
