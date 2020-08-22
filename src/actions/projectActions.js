import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

const URL = "/api/project/";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post(URL, project);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjectsAll = () => async (dispatch) => {
  const res = await axios.get(URL + "all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProjectByIdentity = (identity, history) => async (dispatch) => {
  const res = await axios.get(URL + identity);
  dispatch({
    type: GET_PROJECT,
    payload: res.data,
  });
};

export const deleteProjectByIdentity = (identity) => async (dispatch) => {
  if (window.confirm("delete project?")) {
    await axios.delete(URL + identity);
    dispatch({
      type: DELETE_PROJECT,
      payload: identity,
    });
  }
};
