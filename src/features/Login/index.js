import React, { Component } from 'react'
import { bindToComponent } from '../../utils/component'
import './Login.css'

export default class Login extends Component {
    constructor(props, state){
        super(props, state)
        bindToComponent(this, 'submit')
    }
    submit(e){
        e.preventDefault()
        this.props.onSubmit({
          username: this.loginInput.value,
          password: this.passwordInput
        });
    }
    render() {
        return <div className="row align-items-center justify-content-md-center Login-container">
            <div className="col col-auto">
              <div className="card bg-light Login-inputs">
                <div className="card-body">
                  <form onSubmit={this.submit}>
                    <div className="form-group">
                      <label>User name</label>
                      <input className="form-control" type="text" ref={ref => (this.loginInput = ref)} />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input className="form-control" type="password" ref={ref => (this.passwordInput = ref)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>;
    }
}