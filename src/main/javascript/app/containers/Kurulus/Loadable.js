/**
 *
 * Asynchronously loads the component for Kurulus *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
