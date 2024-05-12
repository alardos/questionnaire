import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { env } from "../../environment";
import { Form, Submit } from "./types";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { Injectable } from "@angular/core";

@Injectable()
export class Service {
    constructor(private http: HttpClient) {

    }

    async saveForm(form: Form) {
        const res = await firstValueFrom(this.http.post(env.baseUrl + "/form/create",form,{headers: { "auth-token": sessionStorage.getItem('auth-token')! }}))
    }

    async getForm(id: string): Promise<Form> {
        const res = await firstValueFrom(this.http.get(env.baseUrl + "/form/read?id="+id, {headers: { "auth-token": sessionStorage.getItem('auth-token')! }}))
            .then(f=>Form.from(f as Form))
        console.log(res);
        return res;
    }

    async readAllForm(): Promise<Form[]> {
        const res = await firstValueFrom(this.http.get(env.baseUrl + "/form/all", {headers: { "auth-token": sessionStorage.getItem('auth-token')! }})).then(f=>f as Form[])
        console.log(res);
        return res;
    }

    async getMyForms(): Promise<Form[]> {
        const res = await firstValueFrom(this.http.get(env.baseUrl + "/form/my-forms", {headers: { "auth-token": sessionStorage.getItem('auth-token')! }})).then(f=>f as Form[])
        console.log(res);
        return res;
    }

    async updateForm(form:Form): Promise<void> {
        await firstValueFrom(this.http.post(env.baseUrl + "/form/update", form, {headers: { "auth-token": sessionStorage.getItem('auth-token')! }}));
        return;
    }

    async deleteForm(id:string): Promise<void> {
        await firstValueFrom(this.http.post(env.baseUrl + "/form/delete?id="+id, undefined, {headers: { "auth-token": sessionStorage.getItem('auth-token')! }}));
        return;
    }

    async getMySubmits(): Promise<Submit[]> {
        const res = await firstValueFrom(this.http.get(env.baseUrl + "/form/my-submits", {headers: { "auth-token": sessionStorage.getItem('auth-token')! }})).then(f=>f as Submit[])
        console.log(res);
        return res;
    }

    async getSubmitDetails(id:string): Promise<Submit> {
        const res = await firstValueFrom(this.http.get(env.baseUrl + "/form/submit-details?id="+id, {headers: { "auth-token": sessionStorage.getItem('auth-token')! }}))
            .then(s=>Submit.from(s as any))
        console.log(res);
        return res;
    }

    async submit(submit:Submit){
        await firstValueFrom(this.http.post(env.baseUrl + "/form/submit",submit,{headers: { "auth-token": sessionStorage.getItem('auth-token')! }}))
    }

    async login(arg:{email:string, password:string}): Promise<void> {
        firstValueFrom(this.http.post(env.baseUrl + "/login", arg))
            .then(async res => {
                if (res instanceof HttpErrorResponse) {
                    return Promise.reject();
                } else if('token' in res) {
                    sessionStorage.setItem('auth-token',res.token as string);
                    return Promise.resolve();

                } else {
                    return Promise.reject();
                }
            });
    }

    async signup(arg:{email:string, password:string}): Promise<void> {
        firstValueFrom(this.http.post(env.baseUrl + "/signup", arg))
            .then(res => {
                if (res instanceof HttpErrorResponse) {
                    return Promise.reject();
                } else if('token' in res) {
                    sessionStorage.setItem('auth-token',res.token as string);
                    return Promise.resolve();

                } else {
                    return Promise.reject();
                }
            });

    }
}
