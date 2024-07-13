
import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const images = [
    '/Works/Photo/JSP05036.png',
    '/Works/Photo/JSP03870.png',
    '/Works/Photo/JSP04684.png',
    '/Works/Photo/JSP06537-2.png',
    '/Works/Photo/JSP02798.png',
    '/Works/Photo/JSP04004.png',
    '/Works/Photo/JSP04719.png',
    '/Works/Photo/JSP04199.png',
    '/Works/Photo/JSP090961.png',
    '/Works/Photo/JSP00237.png',
    '/Works/Photo/JSP03728.png',
    '/Works/Photo/JSP05743.png',
    '/Works/Photo/6.png',
    '/Works/Photo/2022-03-06 (40).png',
    '/Works/Photo/JSP08690.png',
    '/Works/Photo/JSP04310.png',
    '/Works/Photo/2022-03-06 (12).png',
    '/Works/Photo/JSP05852.png',
    '/Works/Photo/JSP03694.png',
    '/Works/Photo/JSP04246.png',
    '/Works/Photo/3.png',
    '/Works/Photo/JSP04170.png',
    '/Works/Photo/2022-03-06 (57).png',
    '/Works/Photo/20220912-JSP05642.png',
    '/Works/Photo/JSP01505.png',
    '/Works/Photo/JSP00195.png',
    '/Works/Photo/2022-03-06 (39).png',
    '/Works/Photo/JSP04188.png',
    '/Works/Photo/JSP08613.png',
    '/Works/Photo/2022-03-06 (42).png',
    '/Works/Photo/2022-03-06 (55).png',
    '/Works/Photo/8.png',
    '/Works/Photo/JSP01164.png',
    '/Works/Photo/JSP07736.png',
    '/Works/Photo/JSP07662.png',
    '/Works/Photo/JSP05937.png',
    '/Works/Photo/JSP03132.png',
    '/Works/Photo/2.png',
    '/Works/Photo/JSP07745.png',
    '/Works/Photo/2022-03-06 (49).png',
    '/Works/Photo/JSP05909.png',
    '/Works/Photo/JSP06034.png',
    '/Works/Photo/JSP03326.png',
    '/Works/Photo/114A8689.png',
    '/Works/Photo/9.png',
    '/Works/Photo/JSP09726.png',
    '/Works/Photo/7.png',
    '/Works/Photo/JSP08437.png',
    '/Works/Photo/JSP04494.png',
    '/Works/Photo/2022-03-06 (51).png',
    '/Works/Photo/2022-03-06 (36).png',
    '/Works/Photo/JSP08547.png',
    '/Works/Photo/JSP02787.png',
    '/Works/Photo/JSP04146.png',
    '/Works/Photo/1.png',
    '/Works/Photo/JSP04777.png',
    '/Works/Photo/JSP05540.png',
    '/Works/Photo/114A8695.png',
    '/Works/Photo/JSP06218-2.png',
    '/Works/Photo/JSP05457.png',
    '/Works/Photo/2022-03-06 (28).png',
    '/Works/Photo/5.png',
    '/Works/Photo/JSP02645.png',
    '/Works/Photo/JSP07914.png',
    '/Works/Photo/JSP02884.png',
    '/Works/Photo/JSP07728.png',
    '/Works/Photo/2022-03-06 (30).png',
    '/Works/Photo/JSP00159.png',
    '/Works/Photo/4.png',
    '/Works/Photo/JSP00085.png',
    '/Works/Photo/JSP04743.png',
    '/Works/Photo/20220912-JSP05441.png',
    '/Works/Photo/2022-03-06 (23).png',
    '/Works/Photo/JSP07927.png',
    '/Works/Photo/JSP08293.png',
    '/Works/Photo/JSP04157.png',
    '/Works/Photo/JSP04174.png',
    '/Works/Photo/2022-03-06 (46).png',
    '/Works/Photo/JSP05217.png',
    '/Works/Photo/JSP01133.png',
    '/Works/Photo/2022-03-06 (37).png',
    '/Works/Photo/JSP06705-2.png',
    '/Works/Photo/20220912-JSP05607.png',
    '/Works/Photo/2022-03-06 (43).png',
    '/Works/Photo/JSP08649.png',
    '/Works/Photo/2022-03-06 (34).png',
    '/Works/Photo/JSP09317.png',
    '/Works/Photo/JSP01425.png',
    '/Works/Photo/JSP05645.png',
];

const Photo = () => {
    return (

        <ResponsiveMasonry
            columnsCountBreakPoints={{ 750: 2, 1000: 3 }}
        >
            <Masonry gutter="10px">
                {images.map((image, index) => (
                    <LazyLoadImage
                        key={index}
                        src={image}
                        alt={`Gallery Image ${index}`}
                        effect="blur"
                        style={{ width: '100%', display: 'block' }}
                    />
                ))}
            </Masonry>
        </ResponsiveMasonry>

    );
};

export default Photo;