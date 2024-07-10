
import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const images = [
    '/Works/Photo/JSP00085.png',
    '/Works/Photo/JSP00159.png',
    '/Works/Photo/JSP00195.png',
    '/Works/Photo/JSP00237.png',
    '/Works/Photo/JSP02645.png',
    '/Works/Photo/JSP02787.png',
    '/Works/Photo/JSP02798.png',
    '/Works/Photo/JSP02884.png',
    '/Works/Photo/JSP03132.png',
    '/Works/Photo/JSP03694.png',
    '/Works/Photo/JSP03728.png',
    '/Works/Photo/JSP03870.png',
    '/Works/Photo/JSP04146.png',
    '/Works/Photo/JSP04246.png',
    '/Works/Photo/JSP04310.png',
    '/Works/Photo/JSP04494.png',
    '/Works/Photo/JSP04684.png',
    '/Works/Photo/JSP04719.png',
    '/Works/Photo/JSP04743.png',
    '/Works/Photo/JSP04777.png',
    '/Works/Photo/JSP04830.png',
    '/Works/Photo/JSP05217.png',
    '/Works/Photo/JSP05457.png',
    '/Works/Photo/JSP05645.png',
    '/Works/Photo/JSP05743.png',
    '/Works/Photo/JSP05852.png',
    '/Works/Photo/JSP05909.png',
    '/Works/Photo/JSP05937.png',
    '/Works/Photo/JSP06034.png',
    '/Works/Photo/JSP06218-2.png',
    '/Works/Photo/JSP06537-2.png',
    '/Works/Photo/JSP06705-2.png',
    '/Works/Photo/JSP07914.png',
    '/Works/Photo/JSP08293.png',
    '/Works/Photo/JSP08437.png',
    '/Works/Photo/JSP08613.png',
    '/Works/Photo/JSP08690.png',
    '/Works/Photo/JSP09317.png',
    '/Works/Photo/JSP09726.png',
    '/Works/Photo/JSP090961.png'
];

const Photo = () => {
    return (

        <ResponsiveMasonry
            columnsCountBreakPoints={{ 750: 2, 1000: 3 }}
        >
            <Masonry gutter="10px">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Gallery Image ${index}`}
                        style={{ width: '100%', display: 'block' }}
                    />
                ))}
            </Masonry>
        </ResponsiveMasonry>

    );
};

export default Photo;