import { useState } from "react";

function Login( {onLogin} ) {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value }); 
  }

  return (
    <main className="content">
      <form className="form" name="formSignIn" onSubmit={handleSubmit}> 
        <div className="form__block">
          <h2 className="form__title">Вход</h2>
          <input
            className="form__input"
            id="input-email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={values.email}
            onChange={handleChange}
          />
          <span className="form__input-error" id="input-email-error"></span>
          <input
            className="form__input"
            id="input-password"
            name="password"
            type="password"
            minLength="3"
            maxLength="12"
            placeholder="Пароль"
            required
            value={values.password}
            onChange={handleChange}
          />
          <span className="form__input-error" id="input-password-error"></span>
        </div>
        <div className="form__block">
          <button className="form__submit" type="submit">Войти</button>
          <div className="form__tip"></div>
        </div>
      </form>
    </main>
  )
}

export default Login;