import React from "react";
import LoginForm from "./../components/elements/LoginForm";
import RegForm from "./../components/elements/RegForm";

export default class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectFormLogin: true,
        };

    }

    selectWrapForm(e) {
        this.setState({ selectFormLogin: false });
        if (e.target.classList.contains('form__select-form--enter')) this.setState({ selectFormLogin: true });
    }

    render() {
        return (
            <section className="auth">
                <div className="container">
                    <div className="auth__wrapper">
                        <div className="auth__inner">
                            <h1 className="auth__s-title s-title">Для оформления подписки на тариф, необходимо авторизоваться.</h1>
                            <div className="auth__bg auth__bg--desktop"></div>
                        </div>
                        <div className="auth__inner">
                            <div className="auth__form form form--auth">
                                <div className="form__wrap-btn-select">
                                    <button className={"form__select-form form__select-form--enter " + (this.state.selectFormLogin ? 'active' : '')} onClick={this.selectWrapForm.bind(this)}>Войти</button>
                                    <button className={"form__select-form form__select-form--reg " + (this.state.selectFormLogin ? '' : 'active')} onClick={this.selectWrapForm.bind(this)}>Зарегистрироваться</button>
                                </div>
                                {this.state.selectFormLogin ? <LoginForm preloader={this.props.preloader} /> : <RegForm />}
                            </div>
                            <div className="auth__bg auth__bg--mobile"></div>
                        </div>
                    </div>
                </div>
            </section >
        )
    }
}