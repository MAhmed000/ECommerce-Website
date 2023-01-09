import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  AddNewProduct(data:any){
    return this.http.post("http://localhost:3000/product",data);
  }

  EditProduct(data:any,id:number){
    return this.http.put("http://localhost:3000/product/"+id,data);
  }

  getAllProduct():Observable<any[]>
  {
    return this.http.get<any[]>("http://localhost:3000/product");
  }
  DeleteProduct(id:number)
  {
    return this.http.delete("http://localhost:3000/product/"+id);
  }

}
