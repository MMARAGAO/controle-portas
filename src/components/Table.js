import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchStatus = () =>
            axios.get('http://localhost:3001/status')
                .then((response) => {
                    setData([...response.data.result1, ...response.data.result2]);
                });

        fetchStatus();

        const intervalId = setInterval(fetchStatus, 2000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className='w-full px-2 lg:px-0'>
            <table className='w-full table-auto'>
                <thead>
                    <tr className=' dark:bg-gray-700 border-b dark:border-b-gray-700'>
                        <th className='dark:text-gray-200 text-gray-800 font-bold rounded-tl-xl text-center p-2'>Nome</th>
                        <th className='dark:text-gray-200 text-gray-800 font-bold text-center p-2'>Status</th>
                        <th className='dark:text-gray-200 text-gray-800 font-bold rounded-tr-xl text-center p-2'>Última Atualização</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr className={`border-b dark:border-b-gray-700 ${item.nome_porta ? (item.status === 1 ? '' : 'bg-red-500 text-white') : (item.status === 1 ? 'bg-red-500 text-white' : '')}`} key={index}>
                            <td className='dark:text-gray-200 text-gray-800 p-1 rounded-l-md text-left 2xl:p-2'>{item.nome_porta || item.nome_camera}</td>
                            <td className='dark:text-gray-200 text-gray-800 p-1 text-center 2xl:p-2'>{item.nome_camera ? (item.status === 1 ? 'Aberta' : 'Fechada') : (item.status === 1 ? 'Fechada' : 'Aberta')}</td>
                            <td className='dark:text-gray-200 text-gray-800 p-1 rounded-r-md text-center 2xl:p-2'>{new Date(item.last_update).toLocaleDateString('pt-BR') + ' ' + new Date(item.last_update).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                        </tr>
                    ))}
                </tbody>
                {/* footer da tabela */}
                <tfoot>
                    <tr className='dark:bg-gray-700 border-t dark:border-t-gray-700'>
                        <td className='px-2 dark:text-gray-200 text-gray-800 2xl:p-2 rounded-b-xl' colSpan='3'>Total de portas: {data.filter(item => item.nome_porta).length}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Table;