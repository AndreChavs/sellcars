export default class ProdutoRequest {
  public url: string;
  
  constructor(url:string){
    this.url = this.urlApiPath(url);   
  }

  private urlApiPath(url:string):string{
    if(process.env.NEXT_API_URL){
      return process.env.NEXT_API_URL + url
    } else {
      return window.location.origin + url
    }
  }

  public async getRequest(setUpdateData?:(formData: any) => void){
    const response = await fetch(this.url)    
    if (response.ok) {
      if(setUpdateData){
        setUpdateData(await response.json())        
      } else {        
        return await response.json();
      }
    }else {
      return null
    }
  }

  public async postRequest(formData:DataGridCarFormData){
    const options = {
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    }   
    const response = await fetch(this.url, options)
    if (response.ok) {
      const {message} = await response.json()
      return message
    } else {
      alert(response.statusText)
    }
  }

  public async updateRequest(formData:DataGridCar, setUpdateData?:(FormData:any) => void){
    const options = {
      method:"PUT",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }    
    const response = await fetch(this.url, options);    
    if (response.ok) {
      if(setUpdateData) this.getRequest(setUpdateData);
      const {message} = await response.json()
      alert(message)
    } else {
      alert(response.statusText)
    }
  }

  public async deleteRequest(id:string, setUpdateData?:(FormData:any) => void){
    const options = {
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({id: id})
    }
    
    const response = await fetch(this.url, options)
    console.log(response)
    if (response.ok) {
      const {message} = await response.json()
      if(setUpdateData) this.getRequest(setUpdateData);      
      alert(message)
    } else {
      alert(response.statusText)           
    }
  }
}