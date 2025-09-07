"use client";
import React, { use } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import './home.css';

export default function Home() {
  return (
    <main className="home-container">
      <section className="welcolme-section">
        <div  className="text-section">
          <h1>El Futuro del Software y la IA, Hoy.</h1>
          <p>Accede a un catálogo de software e inteligencia artificial diseñado para potenciar tu negocio. Optimiza, crea e innova con las mejores herramientas del mercado.</p>
          <button className="explore-button">Explorar</button>
        </div>
        <div  className="image-section">
            <Image
              src="/women-img-01.png"
              alt="Imagen de tecnología"
              fill
              className="responsive-image"
              >
            </Image>
        </div>
      </section>
      <div className='separation-1'></div>
      <section className="info-section">
        <div className="info-item">
          <h2>¿Quienes somos?</h2>
          <p>En Onovatech, somos expertos en tecnología con una misión clara: conectar a profesionales y empresas como tú con las mejores herramientas de software e inteligencia artificial. Actuamos como curadores, seleccionando solo productos que impulsan tu eficiencia, creatividad y te dan una ventaja competitiva real. Tu éxito es nuestro objetivo.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="content-title">
          <h2>Explora nuestra Web</h2>
        </div>
        <div className="content-items">
          <div className="content-item">
          <Link href="/login" className="icon-conten"><ArrowUpRight size={35} color={'#30343f'}/></Link>
          <Image src="/img-section/im1.png" alt="Descripción de la imagen" 
                fill
                className="content-item-img"
              />
            <h3>Comunidad</h3>
          </div>
          <div className="content-item">
          <Link href="/shop" className="icon-conten"><ArrowUpRight size={35} color={'#30343f'}/></Link>
          <Image src="/img-section/im3.png" alt="Descripción de la imagen" 
                fill
                className="content-item-img"
              />
            <h3>Tienda</h3>
          </div>
          <div className="content-item">
          <Link href="/shop" className="icon-conten"><ArrowUpRight size={35} color={'#30343f'}/></Link>
          <Image src="/img-section/im2.png" alt="Descripción de la imagen" 
                fill
                className="content-item-img"
              />
            <h3>Servicios</h3>
          </div>
        </div>
      </section>

      <section className="contac-section">
        <div className="contac-title">
          <h2>Contáctanos</h2>
        </div>
        <div className="contac-items">
          <div className="contac-item">
            <Link href="/login" className="icon-logo-1">
              <Image src="/social-logos/8.png" alt="Descripción de la imagen"
                width={130}
                height={130} 
              />
            </Link>
          </div>
          <div className="contac-item">
            <Link href="/login" className="icon-logo-2">
              <Image src="/social-logos/5.png" alt="Descripción de la imagen"
                width={130}
                height={130} 
              />
            </Link>
          </div>
          <div className="contac-item">
            <Link href="/login" className="icon-logo-3">
              <Image src="/social-logos/3.png" alt="Descripción de la imagen" 
                width={130}
                height={130} 
              />
            </Link>
          </div>
          <div className="contac-item">
            <Link href="/login" className="icon-logo-4">
              <Image src="/social-logos/7.png" alt="Descripción de la imagen" 
                width={130}
                height={130}  
              />
            </Link>
          </div>
          <div className="contac-item">
            <Link href="/login" className="icon-logo-5">
              <Image src="/social-logos/6.png" alt="Descripción de la imagen" 
                width={130}
                height={130} 
              />
            </Link>
          </div>
          <div className="contac-item">
            <Link href="/login" className="icon-logo-6">
              <Image src="/social-logos/2.png" alt="Descripción de la imagen" 
                width={130}
                height={130} 
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="final-section">
        <div  className="text-sectionB">
          <h1>Únete a Nuestra Comunidad</h1>
          <p>Descubre lo último en innovación. Inicia sesión o crea una cuenta para obtener ofertas exclusivas en tecnología, IA y software. éxito es nuestro objetivo.</p>
          <button className="explore-buttonB">Regístrate</button>
        </div>
        <div  className="image-sectionB">
            <Image
              src="/women-img-02.png"
              alt="Imagen de tecnología"
              fill
              className="responsive-imageB"
              >
            </Image>
        </div>
      </section>
    </main>
  );
}