import React from 'react'

function NavbarComponent() {
  return (
    <>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#" style={{color: "green", fontSize: "1.5em", textDecoration: "none", fontWeight: "bold"}}>ATTG</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
    
   

    </ul>
    
     
      <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Login</button>
  
  </div>
</nav>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="loginModalLabel">Login</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="username" class="col-form-label">Username:</label>
            <input type="text" class="form-control" id="username"/>
          </div>
          <div class="form-group">
            <label for="password" class="col-form-label">Password:</label>
            <input type="password" class="form-control" id="password"/>
          </div>
          <div class="form-check">
            <input type="radio" class="form-check-input" name="userType" id="studentRadio" value="student" checked/>
            <label class="form-check-label" for="studentRadio">Student</label>
          </div>
          <div class="form-check">
            <input type="radio" class="form-check-input" name="userType" id="teacherRadio" value="teacher"/>
            <label class="form-check-label" for="teacherRadio">Teacher</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="login()">Login</button>
      </div>
    </div>
  </div>
</div>

</>
  )
}

export default NavbarComponent