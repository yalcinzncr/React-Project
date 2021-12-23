/**
 *
 * Asynchronously loads the component for ContentLoader
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
