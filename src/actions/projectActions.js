import axios from "axios";
import { GET_ERRORS } from "./types";

const URL = "http://localhost:8080/api/project/";

export const createProject = (project, history) => async (dispatch) => {
  try {
    console.log(history);
    const res = await axios.post(URL, project);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
