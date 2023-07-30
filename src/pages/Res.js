import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import News from "./../components/sections/News";
import ResInfo from "./../components/sections/ResInfo";
import Preloader from "./../components/elements/Preloader";

import getDefData from "./../hooks/getDefData";
import getPostsInit from "./../hooks/getPostsInit";

export default function Res(props) {
    const navigate = useNavigate();
    const mainData = localStorage.getItem('inputValues');
    if (mainData === 'null') navigate("/search");

    const [err, setErr] = useState(false);
    const [showBtnMorePost, setShowBtnMorePost] = useState(false);
    const [errSearchText, setErrSearchText] = useState(false);
    const [preloader, setPreloader] = useState(true);
    const [histogramsResult, setHistogramsResult] = useState(null);
    const [posts, setPosts] = useState(null);
    const promise = getDefData();

    useEffect(() => {

        promise.histograms.then(
            res => {
                if (res.data.length <= 0) return (setInterval(() => {
                    setErrSearchText('Ничего не найдено')
                }, 1500));
                setHistogramsResult(res);
            },
            err => {
                console.log(err);
                setErr(err);
            }
        );

        if (errSearchText) return;

        localStorage.setItem('posts', JSON.stringify(null));

        promise.objectSearch.then(
            res => {
                if (res.items.length <= 0) return;
                getPosts(res);
            },
            err => {
                console.log(err);
                setErr(err);
            }
        );

    }, []);

    const getPosts = (arr, status = null) => {
        getPostsInit(arr, status).then(
            result => {
                if (result.length <= 0) return;

                setInterval(() => {
                    setPreloader(false);
                }, 1500);

                setPostsStore(result);

                (JSON.parse(localStorage.getItem('idsHide')) === null) ?
                    setShowBtnMorePost(false) : setShowBtnMorePost(true);
            },
            err => {
                console.log(err);
                setErr(err);
            }
        );
    }

    function setPostsStore(res) {
        const posts = JSON.parse(localStorage.getItem('posts'));
        if (posts !== null) {
            res.forEach(element => {
                posts.push(element);
            });
            localStorage.setItem('posts', JSON.stringify(posts));
        } else {
            localStorage.setItem('posts', JSON.stringify(res));
        }
        setPosts(res);
    }

    const moreBtn = () => {
        const ids = JSON.parse(localStorage.getItem('idsHide'));
        if (ids === null) return;
        getPosts(ids, 'newPost');
    }

    return (
        <section className="res">
            <div className={"container " + (errSearchText ? 'hide' : '')}>
                <div className={"res__main-wrapper " + (preloader ? "" : "hide")}>
                    <div className="res__main-inner">
                        <h1 className="res__main-s-title s-title">Ищем. Скоро будут результаты</h1>
                        <div className="res__main-desc">
                            Поиск может занять некоторое время, просим сохранять терпение.
                        </div>
                    </div>
                    <div className="res__main-inner res__main-inner--picture"></div>
                </div>

                <ResInfo
                    usePreloader={preloader}
                    histogramsResult={histogramsResult} />

                <News
                    usePreloader={preloader}
                    posts={posts} />
                <Preloader preloader={preloader} />
                <div className={"res__align " + (showBtnMorePost ? 'show' : 'hide')}>
                    <button className="res__more-btn" onClick={moreBtn}>Показать еще</button>
                </div>
            </div>
            <div className={"container " + (errSearchText ? '' : 'hide')}>
                <h1 className="res__main-s-title s-title">Ничего не найдено!</h1>
                <Link to="/search">Вернуться к запросу</Link>
            </div>
        </section>
    )
}