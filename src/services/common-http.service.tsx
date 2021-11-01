import { v4 as uuidv4 } from 'uuid';
import i18n from '../wrappers/i18n/i18n';

require('dotenv').config();

const APPURL = `${process.env.REACT_APP_HOST_URL || 'http://localhost:9090'}/origination/api/v3/cnynotes`;
export class CommonHttpService {
    language: any;
    get(url: string) {
        return fetch(`${APPURL}${url}`, {
            method: 'GET',
            headers: this.headers()
        }).then(response => response.json()).then((res) => {
            return res;
        }).catch((err) => {
            return err;
        })
    }

    post(url: string, body: any) {
        return fetch(`${APPURL}${url}`, {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify(body)
        }).then(response => response.json()).then((res) => {
            return res;
        }).catch((err) => {
            return err;
        })
    }

    headers() {
        let headers: any = {};
        headers["Content-Type"] = "application/json";
        headers["Accept"] = "application/json";
        let SC_CLIENT_CONTEXT = {
            "reqId": `${uuidv4()}`,
            "Channel": "Web",
            "Country": "HK",
            "Language": "EN",
            "AppName": "RCWB",
            "ClientId": "WEB",
            "RumDevice": "devicebrowserversion",
            "appVersion": "1.0",
            "userId": "CNY-1635753999385-WNFAR5VJOOSV",
            "releaseVersion": "cnynotes"
        };
        headers["SC-CLIENT-CONTEXT"] = JSON.stringify(SC_CLIENT_CONTEXT);
        return headers;
    };

    setLanguage(lang: string) {
        this.language = lang;
        i18n.changeLanguage(this.language);
    }
}