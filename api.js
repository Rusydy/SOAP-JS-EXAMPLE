import request from "request";
import { DOMParser } from "xmldom";

const query = (Temp, elementToParse) => {
    let xml = `<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"https://www.w3schools.com/xml/\">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:FahrenheitToCelsius>
            <!--Optional:-->
            <ns:Fahrenheit>${Temp}</ns:Fahrenheit>
        </ns:FahrenheitToCelsius>
    </soapenv:Body>
    </soapenv:Envelope>`;

    let options = {
        method: "POST",
        url: "https://www.w3schools.com/xml/tempconvert.asmx",
        headers: {
            'Content-Type': 'text/xml'
        },
        body: xml
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) {
                // reject instead of throwing, handle with `catch`
                reject(new Error(error));
                return;
            }
            let text = response.body;
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(text, "text/xml");
            let xmlResult = xmlDoc.getElementsByTagName(`${elementToParse}`)
            [0].childNodes[0].nodeValue;
            resolve(xmlResult);
        });
    });
};


// export this function to use in index.js
export { query };