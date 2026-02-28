import {DeleteObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3"
const BUCKET = process.env.BUCKET

export const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export const uploadImageToS3 = async ({file, bucketFolder, articleId}:{file: File, bucketFolder:"articles" |"books" , articleId:string}) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const key = `${bucketFolder}/${articleId}/${crypto.randomUUID()}`
    const command = new PutObjectCommand({
        Bucket: BUCKET, 
        Key: key, 
        Body: buffer,
        ContentType: file.type,
    })

    try {
        await s3.send(command)
        return {key}
    }catch(error) {
        return {error}
    }
}

export const deleteImageFromS3 = async (imageUrl:string) => {
    const key = imageUrl.replace("https://carfitapp.s3.eu-north-1.amazonaws.com/", "")
    try{
        await s3.send(new DeleteObjectCommand({Bucket: BUCKET, Key: key }))
        return {success: true}
    }catch{
        return {success: false}
    }
}