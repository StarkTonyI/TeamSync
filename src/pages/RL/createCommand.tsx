import './createCommand.scss';

export default function CreateCommand(){
return <form>
<input id="input-1" type="text" placeholder="John Doe" required />
<label htmlFor="input-1">
  <span className="label-text">Full Name</span>
  <span className="nav-dot"></span>
  <div className="signup-button-trigger">Sign Up</div>
</label>
<input id="input-2" type="text" placeholder="john" required />
<label htmlFor="input-2">
  <span className="label-text">Username</span>
  <span className="nav-dot"></span>
</label>
<input id="input-3" type="login" placeholder="login" required />
<label htmlFor="input-3">
  <span className="label-text">Login</span>
  <span className="nav-dot"></span>
</label>
<input id="input-4" type="text" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required />
<label htmlFor="input-4">
  <span className="label-text">Password</span>
  <span className="nav-dot"></span>
</label>
<input id="input-5" type="text" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required />
<label htmlFor="input-5">
  <span className="label-text">Confirm Password</span>
  <span className="nav-dot"></span>
</label>
<button type="submit">Create Your Account</button>
<p className="tip">Press Tab</p>
<div className="signup-button">Sign Up</div>
</form>

}

