import axios from "axios";

import { config } from "./config";

const apiInstance = axios.create({
  baseURL: `${config.server}/api`,
});

export { apiInstance };
