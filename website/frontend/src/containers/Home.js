import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import { Helmet } from "react-helmet";

const Home = () => {
    const [listings, setListings] = useState([]);
    return (
        <>
            <Helmet>
                <title>Real Estate </title>
            </Helmet>
            <section className="">
                <SearchForm setListings={setListings} />
            </section>
        </>
    );
};

export default Home;
