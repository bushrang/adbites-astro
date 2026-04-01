import { useEffect, useRef } from 'react';
import { renderStudio } from 'sanity';
import config from '../../sanity.config';

export default function Studio() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            renderStudio(containerRef.current, config);
        }
    }, []);

    return <div ref={containerRef} id="sanity" style={{ height: '100vh', maxHeight: '100dvh', overscrollBehavior: 'none' }} />;
}
