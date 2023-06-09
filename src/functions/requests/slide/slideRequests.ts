export default class SlideRequests{
  public url:string;
  constructor(url: string){
    this.url = this.urlApiPath(url);
  }

  private urlApiPath(url:string):string{
    if(process.env.NEXT_API_URL){
      return process.env.NEXT_API_URL + url
    } else {
      return window.location.origin + url
    }
  }

  public async getRequest(setDataSlide?:(formData: DataGridState[]) => void):Promise<DataGridState[] | null | undefined>{    
    const response = await fetch(this.url)
    if (response.ok) {    
      if (setDataSlide) {
        setDataSlide(await response.json())      
      }else {
        return await response.json()
      }
    } else {
      return null
    }
  }

  public async postRequest(formData: DataGridState, setDataSlide: any){
    const options = {
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    }
    
    const response = await fetch(this.url, options);        
    if (response.ok) {
      const {message} = await response.json()      
      await this.getRequest(setDataSlide)
      alert(message)
      return message
    }else {
      return 'Falha ao enviar os dados'
    }
  }

  public async updateRequest(formData:DataGridState, setDataSlide:any){
    const options = {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    }
    
    const response = await fetch(this.url, options)
    if(response.ok){
      const {message} = await response.json()    
      await this.getRequest(setDataSlide)
      return message        
    }else {
      alert("Falha ao editar os dados")
    }
  }

  public async deleteRequest(id:string, setDataSlide:any):Promise<string>{
    const options = {
      method: 'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({id: id})
    }
    
    const response = await fetch(this.url, options)
    if(response.ok){
      const {message} = await response.json()
      await this.getRequest(setDataSlide)
      return message
    }else{
      return 'Erro ao fazer a requisição'
    }
  }
}

