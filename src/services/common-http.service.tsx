import { Empty, Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import i18n from '../wrappers/i18n/i18n';

require('dotenv').config();


const APPURL = `${process.env.REACT_APP_HOST_URL || 'http://localhost:9090'}/origination/api/v3/cnynotes`;
export class CommonHttpService {
    language: any;
    uuid: any;
    get(url: string, uuid: any, lang: any) {
        console.log("language from captcha is:" + this.language)
        return fetch(`${APPURL}${url}`, {
            method: 'GET',
            headers: this.headers(uuid, lang)
        }).then(response => response.json())
    }

    post(url: string, body: any, uuid: any, lang: any) {
        console.log("language from captcha is:" + this.language)
        return fetch(`${APPURL}${url}`, {
            method: 'POST',
            headers: this.headers(uuid, lang),
            body: JSON.stringify(body)
        }).then(response => response)
    }

    headers(uuid: any, lang: any) {
        let headers: any = {};
        headers["Content-Type"] = "application/json";
        headers["Accept"] = "application/json";
        let SC_CLIENT_CONTEXT = {
            "reqId": `${uuidv4()}`,
            "Channel": "Web",
            "Country": "HK",
            "Language": lang,
            "AppName": "RCWB",
            "ClientId": "WEB",
            "RumDevice": "devicebrowserversion",
            "appVersion": "1.0",
            "userId": uuid,
            "releaseVersion": "cnynotes"
        };
        headers["SC-CLIENT-CONTEXT"] = JSON.stringify(SC_CLIENT_CONTEXT);
        return headers;
    };

    setLanguage(lang: string) {
        this.language = lang;
        i18n.changeLanguage(this.language);
    }

    setUUID(uuid: string) {
        this.uuid = uuid;
        i18n.changeLanguage(this.language);
    }
}