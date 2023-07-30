
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <section className="not-found">
            <div className="container">
                <h1 className="not-found__s-title s-title">404 <br /> <span>Такой страницы не существует</span></h1>
                <Link to="/" className="not-found__link">Вернуться на главную</Link>
            </div>
        </section>
    )
}