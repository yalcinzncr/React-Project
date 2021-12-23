/**
 *
 * Asynchronously loads the component for BankaKullanici *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
