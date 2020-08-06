import Config from "./config";
import axios from "axios";

const command = {
    sendCommand(domain, commandName, body) {
        const dataSend = {
            CommandName: commandName,
            Domain: domain,
            Content: JSON.stringify(body),
            TimeOutSecond: 20,
        };

        const api_url = Config.url_api + "/Command/SendSync";
        return axios.post(api_url, dataSend);
    },
};

export default command;
