import axios from "axios";

async function uploadImage(file: File){
    const clientId = import.meta.env.VITE_Imgur_client_id
    const data = new FormData()
    data.append('image', file)
    
    const result = await axios.post<BasicImgurResponse>(
        "https://api.imgur.com/3/image",
        data,
        {
            headers: {
                Authorization: `Client-ID ${clientId}`
            }
        })
    return result
} 

async function deleteImage(imageDeleteHash: string): Promise<string | null>{
    const clientId = import.meta.env.VITE_Imgur_client_id
    const data = new FormData()
    
    const result = await axios.delete<BasicImgurResponse>(
        `https://api.imgur.com/3/image/${imageDeleteHash}`,
        {
            headers: {
                Authorization: `Client-ID ${clientId}`
            },
            data
        }
    )
    if(result.data.success){
        return imageDeleteHash
    } else return null
} 

async function asd(imageHash: string){
    const clientId = import.meta.env.VITE_Imgur_client_id
    
    const result = await axios.get(
        `https://api.imgur.com/3/image/${imageHash}`,
        {
            headers: {
                Authorization: `Client-ID ${clientId}`
            }
        }
    )
    return result.data.success
} 

interface BasicImgurResponse{
    data: any,
    success: boolean,
    status: number
}

export const imgur = {
    uploadImage,
    deleteImage,
    asd
}