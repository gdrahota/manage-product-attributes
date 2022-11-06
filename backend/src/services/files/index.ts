import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import { EnumEntityName, FileTable, tFileTable } from '../../db/tables/files'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { PutObjectCommandInput } from '@aws-sdk/client-s3/dist-types/commands/PutObjectCommand'

dotenv.config()

const { DO_SPACES_ENDPOINT, DO_SPACES_NAME, DO_SPACES_KEY, DO_SPACES_SECRET } = process.env

export class File {
  private readonly fileTable = new FileTable()

  async getById( fileId: number ): Promise<any> {
    return this.fileTable.getById( fileId )
  }

  async createFile( file: fileUpload.UploadedFile, entityName: EnumEntityName, instanceId: number ): Promise<tFileTable> {
    const recordToInsert: Omit<tFileTable, 'id'> = {
      name: file.name,
      entityName,
      instanceId,
      size: file.size,
      mimeType: file.mimetype,
    }

    const fileMetaData: tFileTable = await this.fileTable.add( recordToInsert )

    await this.storeFile( file, this.getPath( entityName, instanceId ), this.getFileName( fileMetaData.id ) )

    return fileMetaData
  }

  private getPath = ( entityName: EnumEntityName, instanceId: number ): string => {
    return `${ entityName }-${ instanceId }`
  }

  private getFileName = ( id: number ): string => {
    return `uploaded-file-${ id }`
  }

  private async storeFile( file: fileUpload.UploadedFile, folderName: string, fileName: string ) {
    const s3Client = new S3Client( {
      endpoint: DO_SPACES_ENDPOINT,
      region: "ams3",
      credentials: {
        accessKeyId: DO_SPACES_KEY || 'missing',
        secretAccessKey: DO_SPACES_SECRET || 'missing',
      }
    } )

    const params: PutObjectCommandInput = {
      Bucket: `${ DO_SPACES_NAME }.${ folderName }`,
      Key: fileName as string,
      Body: file.data,
      ACL: "public-read",
      Metadata: {},
    }

    try {
      return s3Client.send( new PutObjectCommand( params ) )
    } catch ( err ) {
      console.error( "Error", err )
    }
  }
}
