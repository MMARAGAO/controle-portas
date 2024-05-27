import React from "react";
import Table from "../components/Table";
import Cam from "../components/Cam";
import Header from "../components/Header";
import ButtonTheme from "../components/ButtonTheme";
import Footer from "../components/Footer";
import Alarme from "../components/Alarme";

const Home = () => {
    return (
        <div className="dark:bg-gray-900 dark:text-white">
            <Header />
            <ButtonTheme />
            <div className="container mx-auto flex flex-col md:flex-row space-y-6 lg:space-x-5  pb-10 ">
                <Table />
                <Cam />
            </div>
            <Footer />
            <Alarme />
        </div>
    );
}

export default Home;