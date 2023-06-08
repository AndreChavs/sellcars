export async function getSlides(setDataSlide?:(formData: DataGridState[]) => void) {
  // const url = 'http://localhost:3000/api/sliders'
  const url = `${process.env.NEXT_API_URL}/api/sliders`
  const response = await fetch(url)  
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

export async function postSlide(formData: DataGridState, setDataSlide: any){
  if(typeof formData.image !== 'string' && typeof formData.imageMobile !== 'string'){
    const url = `${process.env.NEXT_API_URL}/api/sliders`
    const options = {
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    }   
    const response = await fetch(url, options);    
    if (response.ok) {
      const {message} = await response.json()      
      await getSlides(setDataSlide)
      alert(message)
    }else {
      console.log('Falha ao enviar os dados')
    }
  }
}

export async function updateSlide(formData:DataGridState, setDataSlide:any) {
  const url = `${process.env.NEXT_API_URL}/api/sliders`
  const options = {
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(formData)
  }
  const response = await fetch(url, options)
  if(response.ok){
    const {message} = await response.json()    
    await getSlides(setDataSlide)        
  }else {
    alert("Falha ao editar os dados")
  }
}

export async function deleteSlide(id:string, setDataSlide:any) {
  const url = `${process.env.NEXT_API_URL}/api/sliders`
  const options = {
    method: 'DELETE',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({id: id})
  }
  const response = await fetch(url, options)
  if(response.ok){
    const {message} = await response.json()
    await getSlides(setDataSlide)
    alert(message)
  }else{
    alert('Erro ao fazer a requisição')
  }
}