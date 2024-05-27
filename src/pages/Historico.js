import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Table from "../components/Table";
import Cam from "../components/Cam";
import Header from "../components/Header";
import ButtonTheme from "../components/ButtonTheme";
import Footer from "../components/Footer";
import Alarme from "../components/Alarme";

const SelectPort = () => {
    const options = [
        { id: 0, label: "S4  porta 2" },
        { id: 1, label: "S3  porta 2" },
        { id: 2, label: "S2  porta 2" },
        { id: 3, label: "S1  porta 1 (Dispara Alarme CFTV) - Cozinha" },
        { id: 4, label: "S1  porta 2 (Dispara Alarme CFTV) - Escada" },
        { id: 5, label: "S1  porta 3 (Dispara Alarme CFTV) - Corredor" },
        { id: 6, label: "Térreo porta 1" },
        { id: 7, label: "Térreo porta 2" },
        { id: 8, label: "Porta 3º Andar" },
        { id: 9, label: "Porta 4º Andar" },
        { id: 10, label: "Porta 17º Andar" },
        { id: 11, label: "Porta 13º Andar" },
        { id: 12, label: "Porta 14º Andar" },
        { id: 13, label: "Porta 16º Andar" },
        { id: 14, label: "Porta 18º Andar (Dispara Alarme CFTV)" },
        { id: 15, label: "Heliponto  (Dispara Alarme CFTV)" },
        { id: 16, label: "Câmera Fundos Condensadora (Dispara Alarme)" },
        { id: 17, label: "Câmera Porta Condensadora (Dispara Alarme)" },
    ];

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [history, setHistory] = useState([]);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const fetchHistory = async () => {
        if (!selectedOption || !selectedDate) {
            alert('Selecione uma porta e uma data');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/history?id=${selectedOption}&last_update=${selectedDate}`);
            setHistory(response.data);
        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
        }
    };

    return (
        <div>
            <div className='dark:bg-gray-900 dark:text-white min-h-screen flex flex-col'>
                <Header />
                <ButtonTheme />
                <div className='container mx-auto p-6'>
                    <h1 className='text-2xl font-bold mb-6'>Buscar Histórico de Portas</h1>
                    <div className='flex items-end space-x-4 mb-4'>
                        <div className='flex-1'>
                            <label className='block text-gray-700 dark:text-gray-300'>Selecione uma porta:</label>
                            <select value={selectedOption} onChange={handleSelectChange} className="w-full p-2 border rounded mt-2 dark:bg-gray-700 dark:border-gray-600">
                                <option value="" disabled>Selecione uma porta</option>
                                {options.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label className='block text-gray-700 dark:text-gray-300'>Selecione a data:</label>
                            <div className="">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="w-full p-2 border rounded mt-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </div>
                        <button onClick={fetchHistory} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    {selectedOption && selectedDate && (
                        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                            <p><strong>Opção selecionada:</strong> {options.find(option => option.id === parseInt(selectedOption)).label}</p>
                            <p><strong>Data selecionada:</strong> {selectedDate}</p>
                        </div>
                    )}
                    {history.length > 0 && (
                        <table className="mt-4 w-full border border-collapse dark:border-gray-600">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-600">
                                    <th className="p-2 border dark:border-gray-600">Seq</th>
                                    <th className="p-2 border dark:border-gray-600">ID Ports</th>
                                    <th className="p-2 border dark:border-gray-600">Status</th>
                                    <th className="p-2 border dark:border-gray-600">Last Update</th>
                                    <th className="p-2 border dark:border-gray-600">Alarme</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item, index) => (
                                    <tr key={index} className="bg-white even:bg-gray-100 dark:bg-gray-800 dark:even:bg-gray-700">
                                        <td className="p-2 border dark:border-gray-600">{item.seq}</td>
                                        <td className="p-2 border dark:border-gray-600">{item.id_ports_fk}</td>
                                        <td className="p-2 border dark:border-gray-600">{item.status}</td>
                                        <td className="p-2 border dark:border-gray-600">{item.last_update}</td>
                                        <td className="p-2 border dark:border-gray-600">{item.alarme}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default SelectPort;
