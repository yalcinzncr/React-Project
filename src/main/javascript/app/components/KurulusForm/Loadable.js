/**
 *
 * Asynchronously loads the component for KurulusForm
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
