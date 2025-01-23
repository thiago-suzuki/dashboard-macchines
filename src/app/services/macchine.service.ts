import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "./authentication.service";

@Injectable({
    providedIn: 'root',
})
export class MacchineService {
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    private async getAuthHeader() {
      const { token } = await this.authService.getLocalUser();
    
      return token;
    }

    async authHeaders() {
      const token = await this.getAuthHeader()
      return new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    }
    

    async getMacchineStatus() {
      let headers = await this.authHeaders();
          
      const status: any = await this.http.get(`${environment.apiUrl}/macchine/status`, {
        headers: headers
      })
      .toPromise();
      
      return status;
    }

    async getMacchinesByStatus(statusId: number) {
      let headers = await this.authHeaders();
        
      const macchines: any = await this.http.get(`${environment.apiUrl}/macchine/filter-by-status/${statusId}`, {
        headers: headers
      })
      .toPromise();
      
      return macchines;
    }

    async getDataAddressByCEP(cep: string) {
      const data: any = await this.http.get(`https://viacep.com.br/ws/${cep}/json/`).toPromise();
        
      return data;
    }

    async createMacchine(macchine: any) {
      let headers = await this.authHeaders();
        
      const macchines: any = await this.http.post(`${environment.apiUrl}/macchine`, macchine, {
        headers: headers
      })
      .toPromise();
      
      return macchines;
    }

    async deleteMacchine(macchineId: string) {
      let headers = await this.authHeaders();

      await this.http.put(`${environment.apiUrl}/macchine/delete/${macchineId}`, {},  {
        headers: headers
      })
      .toPromise();
    }

    async updateMacchine(macchine: any) {
      let headers = await this.authHeaders();
        
      const macchines: any = await this.http.put(`${environment.apiUrl}/macchine/${macchine.id}`, macchine, {
        headers: headers
      })
      .toPromise();
      
      return macchines;
    }
}

