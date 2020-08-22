import React, { Component } from "react";
import { getProjectByIdentity } from "../../actions/projectActions";
import { createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {
  state = {
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
    errors: {},
  };

  componentDidMount() {
    const identifierId = this.props.match.params.identity;
    this.props.getProjectByIdentity(identifierId, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    this.setProjectState(nextProps.project);
    if(nextProps.errors) {
        this.setState({errors: nextProps.errors});
    }
  }

  setProjectState = (receiveProject) => {
    this.setState({
      id: receiveProject.project.id,
      projectName: receiveProject.project.projectName,
      projectIdentifier: receiveProject.project.projectIdentifier,
      description: receiveProject.project.description,
      start_date: receiveProject.project.start_date,
      end_date: receiveProject.project.end_date,
    });
  };

  onChange = this.onChange.bind(this);

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const updateProject = {
      id: this.state.id,           
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };
    this.props.createProject(updateProject, this.props.history);
  };

  render() {
    const errors = this.state.errors;
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Create / Edit Project form
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.projectName,
                      })}
                      placeholder="Project Name"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.onChange}
                    />
                    {errors.projectName && (
                        <div className="invalid-feedback">{errors.projectName}</div>
                      )}    
                  </div>
                  {console.log('eeeeeeeeeeeeee d', errors.projectName)}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Unique Project ID"
                      name="projectIdentifier"
                      value={this.state.projectIdentifier}
                      onChange={this.onChange}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Project Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="end_date"
                      value={this.state.end_date}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProject.propTypes = {
  project: PropTypes.object.isRequired,
  getProjectByIdentity: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  project: state.project,
  errors: state.errors,
});
export default connect(mapStateToProps, { getProjectByIdentity, createProject })(
  UpdateProject
);
