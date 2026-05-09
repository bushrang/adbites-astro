import { Studio as SanityStudio } from 'sanity';
import config from '../../sanity.config';

export default function Studio() {
    return (
        <div style={{ height: '100vh', maxHeight: '100dvh', overscrollBehavior: 'none' }}>
            <SanityStudio config={config} />
        </div>
    );
}
