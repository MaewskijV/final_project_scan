import React from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";

import InputFieldsForm from "./../components/elements/InputFieldsForm";
import CheckBoxFieldsForm from "./../components/elements/CheckBoxFieldsForm";

class Search extends React.Component {

    constructor(props) {
        super(props);

        const resetLocalStorage = ['inputValues', 'checkBoxValues'];
        resetLocalStorage.forEach(element => localStorage.setItem(element, null));

        this.startSearch = this.startSearch.bind(this);

        this.state = {
            inputValues: null,
            checkBoxValues: null,
            checkBoxValues: {
                maxFullness: true,
                inBusinessNews: true,
                onlyMainRole: true,
                advertisement: true,
                isDigest: true,
            },
            requiredData: false,
            redirectResPage: false
        }
    }

    inputValue(status, obj) {

        this.setState({
            requiredData: status
        })
        if (!status) return;
        this.setState({
            inputValues: obj
        })
    }

    getCheckBoxValue(obj) {
        this.setState({
            checkBoxValues: obj
        })
    }

    startSearch() {
        this.props.preloader(true);

        if (this.state.requiredData || true) {
            localStorage.setItem('inputValues', JSON.stringify(this.state.inputValues));
            localStorage.setItem('checkBoxValues', JSON.stringify(this.state.checkBoxValues));
            this.setState({ redirectResPage: true });
        }
    }

    render() {
        return (
            <section className="search">
                <div className="container">
                    <div className="search__fly-picture search__fly-picture--one">
                        <img src="./images/svg/ico-a4.svg" alt="" />
                    </div>
                    <div className="search__fly-picture search__fly-picture--two">
                        <img src="./images/svg/ico-folders.svg" alt="" />
                    </div>

                    <div className="search__wrapper">
                        <h1 className="search__s-title s-title">Найдите необходимые данные в пару кликов.</h1>
                        <div className="search__desc">Задайте параметры поиска.<br />Чем больше заполните, тем точнее поиск</div>
                        <form className="search__form">
                            <div className="search__form-wrapper">
                                {this.state.redirectResPage ? (<Navigate to="/res" replace={true} />) : ''}
                                <InputFieldsForm inputValue={this.inputValue.bind(this)} />
                                <CheckBoxFieldsForm
                                    startSearch={this.startSearch.bind(this)}
                                    getCheckBoxValue={this.getCheckBoxValue.bind(this)}
                                    requiredData={this.state.requiredData} />

                            </div>
                        </form>
                    </div>

                    <div className="search__bg"></div>
                </div>
            </section>
        )
    }
}

export default connect(
    state => ({
        resSearch: state.resSearch
    }),
    dispatch => ({
        setResHistograms: (value) => {
            dispatch({ type: "setResHistograms", value: value })
        },
        setResObjectSearch: (value) => {
            dispatch({ type: "setResObjectSearch", value: value })
        }
    })
)(Search);