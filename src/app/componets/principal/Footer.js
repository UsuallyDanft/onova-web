"use client";
import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Columna 1: Sobre la empresa y redes sociales */}
                <div className="footer-column footer-about">
                    <h3 className="footer-logo">Onovatech</h3>
                    <p>
                        Innovando en soluciones tecnológicas para impulsar el futuro digital y conectar al mundo.
                    </p>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook"><FaFacebook /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                    </div>
                </div>

                {/* Columna 2: Enlaces "Sobre Nosotros" */}
                <div className="footer-column footer-links">
                    <h4>Secciones</h4>
                    <ul>
                        <li><a href="/nuestra-historia">Comunidad</a></li>
                        <li><a href="/mision-vision">Tienda</a></li>
                        <li><a href="/equipo">Servicios</a></li>
                        <li><a href="/carreras">Informacion</a></li>
                    </ul>
                </div>

                {/* Columna 3: Enlaces de "Soporte" */}
                <div className="footer-column footer-links">
                    <h4>Soporte</h4>
                    <ul>
                        <li><a href="/faq">Preguntas Frecuentes</a></li>
                        <li><a href="/devoluciones">Política de Devoluciones</a></li>
                        <li><a href="/terminos">Términos de Servicio</a></li>
                        <li><a href="/contacto">Contáctanos</a></li>
                    </ul>
                </div>

                {/* Columna 4: Newsletter */}
                <div className="footer-column footer-newsletter">
                    <h4>Suscríbete a Nuestro Newsletter</h4>
                    <p>Recibe las últimas noticias y ofertas especiales directamente en tu correo.</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Tu correo electrónico" />
                        <button type="submit">Suscribirse</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 Onovatech. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}