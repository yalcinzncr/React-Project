/*
 * App Messages
 *
 * This contains all the text for the App container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.App';

export default defineMessages({
  siteName: {
    id: `${scope}.siteName`,
    defaultMessage: '***** ŞİKAYET YÖNETİM SİSTEMİ',
  },
  searchNoResultsMessage: {
    id: `${scope}.searchNoResultsMessage`,
    defaultMessage: 'Kayıt bulunamadı.',
  },
  searchPlaceholder: {
    id: `${scope}.searchPlaceholder`,
    defaultMessage: 'Hızlı arama',
  },
  copyright: {
    id: `${scope}.copyright`,
    defaultMessage: `T.C. Merkez Bankası © 2019`,
  },
});
