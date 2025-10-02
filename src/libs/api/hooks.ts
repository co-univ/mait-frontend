import createClient from "openapi-react-query";
import apiClient from "./client";

const apiHooks = createClient(apiClient);

export default apiHooks;
