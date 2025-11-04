import { Injectable } from '@angular/core';
// import { environment } from '../enviroments/enviroment';


@Injectable({
    providedIn: 'root',
})
export class AppConstants {

    public static get BASE_API_URL(): string {
        // return 'http://192.168.0.134:3002';
        return 'https://apistlwebsite.silicontechlab.com';
    }
    public static ACCESS_DETAILS: any = {};
    public static get AUTHORIZATION_HEADER(): any {
        let accessTokenDetails = localStorage.getItem('accessTokenDetails');
        if (accessTokenDetails) {
            return 'Bearer ' + JSON.parse(accessTokenDetails)['token'];
        }
        else {
            return null;
        }
    }
    // PASSWORD ENCODING TIME
    public static PASSWORD_ENCODING_TIMES = 2;
    public static PASSWORD_ENCODING_TIMES_WITH_SALT = 1;

    // NORMAL ENCODING TIME
    public static ITEM_ENCODE_ITERATOR = 1;
    public static DECODE_ITERATOR = 1;
    public static DECODE_KEY = '0eef9a9d9ccb8ea0fbb21e03ad2c6609e1b98de53c0bcd084c23c0ca8376f6c7'; // 'MY SESSION STORAGE ENCODING TEST';
}
