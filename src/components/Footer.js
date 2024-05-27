import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="dark:bg-gray-800 dark:text-white  text-gray-500 border-t  p-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <h1 className="text-2xl font-bold mb-2">Sistema de Monitoramento</h1>
                    <p className="text-sm">Monitoramento inteligente e seguro para sua empresa</p>
                </div>
                <div className="flex flex-col md:flex-row text-sm">
                    <div className="mb-6 md:mb-0 md:mr-8">
                        <h2 className="font-semibold mb-2">Links Rápidos</h2>
                        <ul>
                            <li className="mb-1"><a href="#home" className="hover:underline">Home</a></li>
                            <li className="mb-1"><a href="#services" className="hover:underline">Serviços</a></li>
                            <li className="mb-1"><a href="#about" className="hover:underline">Sobre Nós</a></li>
                            <li className="mb-1"><a href="#contact" className="hover:underline">Contato</a></li>
                        </ul>
                    </div>
                    <div className="mb-6 md:mb-0 md:mr-8">
                        <h2 className="font-semibold mb-2">Contato</h2>
                        <p className="mb-1"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> suporte@monitoramento.com</p>
                        <p className="mb-1"><FontAwesomeIcon icon={faPhone} className="mr-2" /> (11) 1234-5678</p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Rua Exemplo, 123, São Paulo, SP</p>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Redes Sociais</h2>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="hover:text-gray-400">
                                <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                            </a>
                            <a href="https://twitter.com" className="hover:text-gray-400">
                                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                            </a>
                            <a href="https://instagram.com" className="hover:text-gray-400">
                                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t  mt-6 pt-4 text-center text-sm">
                <p>&copy; 2024 Sistema de Monitoramento. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
