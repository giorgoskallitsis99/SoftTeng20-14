const axios = require('axios').default;
const path = require('path');
const fs = require("fs");

export async function perPoint(args, httpsAgent){
    let point_id = args.point;
    let datefrom = args.datefrom;
    let dateto = args.dateto;
    let format = args.format;
    const file = path.join(require('os').homedir(), 'softeng20bAPI.token')
    const LocalStorage = require('node-localstorage').LocalStorage;
    const localStorage = new LocalStorage(require('os').homedir(),'softeng20bAPI.token');
    let token = localStorage.getItem('softeng20bAPI.token')

    fs.readFile(file, 'utf8', (err, TOKEN) => {
        if (err) {
            console.error("You have not Login. In order to access these service you have to Login First.")
            process.exit(1)
        }
        else if (format === undefined){
            console.log("Format is missing")
        }
        else {

            if (point_id && datefrom && dateto) {
                let url;
                if(format != "csv") {
                    url = `https://localhost:8765/evcharge/api/SessionPerPoint/${point_id}/${datefrom}/${dateto}`;
                }
                else{
                    url = `https://localhost:8765/evcharge/api/SessionPerPoint/${point_id}/${datefrom}/${dateto}?format={csv}`;
                }
                const options = {
                    httpsAgent,
                    method: 'GET',
                    url: url,
                    headers: {'XOBSERVATORY-AUTH': token}
                };
                axios(options)
                    .then((response) => {
                        let i;
                        for(i=0; i < response.data.length; i++)
                            console.log(response.data[i]);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                console.log("Enter data");
            }
        }
    })
}