/**
 *
 * Asynchronously loads the component for FullPageLoader
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
