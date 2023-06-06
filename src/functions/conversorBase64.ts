export default function convertImageToBase64(image:Blob):Promise<string | ArrayBuffer | null> {
  return new Promise( (resolve, reject) => {
    const reader = new FileReader();    
    reader.readAsDataURL(image);    
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}