/**
 *
 * Asynchronously loads the component for Duyuru *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
