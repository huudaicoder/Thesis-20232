import React, { useState } from "react";
import { Helmet } from "react-helmet";
import SearchForm from "../components/SearchForm";
import AllProperty from "../components/AllProperty";

const Home = () => {
    const [listings, setListings] = useState([]);

    return (
        <>
            <Helmet>
                <title>Real Estate</title>
            </Helmet>
            <section style={{ display: 'flex' }}>
                <div style={{ flex: '1', paddingRight: '10px' }}>
                    <SearchForm setListings={setListings} />
                </div>
                <div style={{ flex: '5', paddingLeft: '10px' }}>
                    <AllProperty listings={listings} />
                </div>
            </section>
        </>
    );
};

export default Home;
