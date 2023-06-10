import { GetStaticPropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export default class StaticGenerate{
  public urlPaths: string;
  public urlProps:string;
  constructor(urlPaths:string, urlProps:string){
    this.urlPaths = this.urlApiPaths(urlPaths);
    this.urlProps = this.urlApiProps(urlProps);
  }

  private urlApiPaths(urlPath:string){
    if(process.env.NEXT_API_URL){
      return process.env.NEXT_API_URL + urlPath
    } else {
      return window.location.origin + urlPath
    }
  }
  private urlApiProps(urlProps:string){
    if(process.env.NEXT_API_URL){
      return process.env.NEXT_API_URL + urlProps
    } else {
      return window.location.origin + urlProps
    }
  }

  public async GetPaths<T>():Promise<T | null>{
    const response = await fetch(this.urlPaths);
    if(response.ok){
      const data = await response.json()
      return data
    } else{
      return null
    }
  }

  public async GetProps<T>(context:GetStaticPropsContext<ParsedUrlQuery, PreviewData>):Promise<T | null>{
    const id = (context.params?.id)? context.params?.id : ''
    const response = await fetch(this.urlProps + id);
    if (response.ok) {
      return await response.json()
    }else {
      return null
    }
  }

}