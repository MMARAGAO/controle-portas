import React, { useEffect, useState } from "react";
import axios from 'axios';



const Alarme = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        const fetchStatus = () => {
            axios.get('http://localhost:3001/status')
                .then((response) => {
                    setData(response.data.result1);
                    setData2(response.data.result2);
                });
        };

        fetchStatus();

        const intervalId = setInterval(fetchStatus, 2000);

        return () => clearInterval(intervalId);
    }, []);

    const desativarAlarme = (id_port, id_cam) => {
        if (id_port) {
            axios.put('http://localhost:3001/update', { id_port })
                .then(response => {
                    // removido console.log
                })
                .catch(error => {
                    // removido console.error
                });
        } else if (id_cam) {
            axios.put('http://localhost:3001/update', { id_cam })
                .then(response => {
                    // removido console.log
                })
                .catch(error => {
                    // removido console.error
                });
        }
    }

    return (
        <div>
            {/* porta */}
            {data.map((item, index) => {
                if (item.alarme === "1") {
                    return <div key={index} className="fixed w-full h-screen flex justify-center items-center bg-gray-900/50 top-0">
                        <h1 className="text-2xl text-white">{item.nome_porta} aberta</h1>
                        <button onClick={() => desativarAlarme(item.id_port, null)} className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4">Desativar alarme</button>
                    </div>
                }

            })}
            {/* camera */}
            {data2.map((item, index) => {
                if (item.alarme === 1) {
                    return <div key={index} className="fixed w-full h-screen flex justify-center items-center bg-gray-900/50 top-0">
                        <h1 className="text-2xl text-white">{item.nome_camera} aberta</h1>
                        <button onClick={() => desativarAlarme(null, item.id)} className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4">Desativar alarme</button>
                    </div>
                }
            })}


        </div>

    );
}

export default Alarme;