// components/product/BlockRenderer.jsx

import React, { Fragment } from 'react';
import Twemoji from 'react-twemoji';
import Image from 'next/image'; // 👈 Importamos el componente Image de Next.js

const renderText = (children) => {
  // ... (esta función no necesita cambios)
  if (!children) return null;
  return children.map((child, index) => {
    let element = <Fragment key={index}>{child.text}</Fragment>;
    if (child.bold) element = <strong key={index}>{element}</strong>;
    if (child.italic) element = <em key={index}>{element}</em>;
    if (child.underline) element = <u key={index}>{element}</u>;
    if (child.strikethrough) element = <s key={index}>{element}</s>;
    return element;
  });
};

// 👇 Le pasamos STRAPI_URL como prop para las imágenes
const BlockRenderer = ({ content, STRAPI_URL }) => {
  if (!Array.isArray(content)) {
    return null;
  }

  return content.map((block, index) => {
    // Extraemos las propiedades del bloque
    const { type, level, children, format, image } = block;

    switch (type) {
      case 'heading':
        const Tag = `h${level || 2}`;
        return (
          <Tag key={index}>
            <Twemoji options={{ className: 'twemoji' }}>
              {renderText(children)}
            </Twemoji>
          </Tag>
        );

      case 'paragraph':
        return (
          <p key={index}>
            <Twemoji options={{ className: 'twemoji' }}>
              {renderText(children)}
            </Twemoji>
          </p>
        );

      case 'list':
        const ListTag = format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={index}>
            {children.map((listItem, liIndex) => (
              <li key={liIndex}>
                <Twemoji options={{ className: 'twemoji' }}>
                  {renderText(listItem.children)}
                </Twemoji>
              </li>
            ))}
          </ListTag>
        );
      
      // --- 👇 NUEVOS BLOQUES AÑADIDOS ---

      case 'quote': // NUEVO: Soporte para citas
        return (
          <blockquote key={index}>
            <Twemoji options={{ className: 'twemoji' }}>
              {renderText(children)}
            </Twemoji>
          </blockquote>
        );

      case 'image': // NUEVO: Soporte para imágenes
        if (!image?.url || !STRAPI_URL) return null;

        const imageUrl = image.url.startsWith('http') 
          ? image.url 
          : `${STRAPI_URL}${image.url}`;

        return (
          <figure key={index} className="description-image">
            <Image
              src={imageUrl}
              alt={image.alternativeText || 'Imagen de la descripción'}
              width={image.width || 800} // Usamos el ancho de Strapi o un valor por defecto
              height={image.height || 600} // Usamos el alto de Strapi o un valor por defecto
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </figure>
        );

      case 'code': // NUEVO: Soporte para bloques de código
        const codeText = children.map(child => child.text).join('\n');
        return (
          <pre key={index}>
            <code>{codeText}</code>
          </pre>
        );
      
      // --- 👆 FIN DE NUEVOS BLOQUES ---

      default:
        // No mostramos la advertencia para tipos que no renderizamos
        return null;
    }
  });
};

export default BlockRenderer;