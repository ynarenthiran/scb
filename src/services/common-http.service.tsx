require('dotenv').config();
const APPURL = `${process.env.APP_URL || 'http://localhost:8080'}/api/v3/cnynotes`;
export class CommonHttpService {
    async get(url: string, staticURL?: boolean) {
        const ipAddr = await fetch('https://ipapi.co/json').then(response => response.json()).then((res) => {
            return res;
        }).catch((err) => {
            return err;
        })
        console.log(ipAddr);
        const URL = staticURL ? url : `${APPURL}${url}`;
        return fetch(URL, {
            method: 'GET',
            headers: {
                reqId: "ae1d7f93-d141-486f-af4a-9b32c3c2c238",
                Language: "EN",
                Channel: "Web",
                Country: "SG",
                AppName: "RCWB",
                ClientId: "WEB",
                RumDevice: "devicebrowserversion",
                HostIp: ipAddr.ip,
                Version: "1.0",
                InstanceCode: "CB_SG"
            }
        }).then(response => response.json()).then((res) => {
            console.log(res);
            return res;
        }).catch((err) => {
            return err;
        })
    }
}