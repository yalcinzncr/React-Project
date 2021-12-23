const menu = {
  data: [
    {
      id: 1,
      title: 'Anasayfa',
      icon: 'home',
      key: 'home',
      url: '/',
    },
    {
      id: 4,
      title: 'Parametreler',
      icon: 'flag outline',
      key: 'parametreler',
      child: [
        {
          id: 5,
          title: 'Müdürlük',
          icon: 'recycle',
          key: 'mudurluk',
          url: '/mudurluk',
        },
        {
          id: 6,
          title: 'Şikayet Tür',
          icon: 'recycle',
          key: 'sikayetTur',
          url: '/sikayetTur',
        },
        {
          id:  7,
          title: 'Kuruluş Tür',
          icon: 'recycle',
          key: 'kurulusTur',
          url: '/kurulusTur',
        },
        {
          id:  8,
          title: 'Kuruluş',
          icon: 'recycle',
          key: 'kurulus',
          url: '/kurulus',
        },
        {
          id:  9,
          title: 'Şikayet Konu',
          icon: 'recycle',
          key: 'sikayetKonu',
          url: '/sikayetKonu',
        },
        {
          id:  10,
          title: 'Şikayet Alt Konu',
          icon: 'recycle',
          key: 'sikayetAltKonu',
          url: '/sikayetAltKonu',
        },
        {
          id:  11,
          title: 'Duyuru',
          icon: 'recycle',
          key: 'duyuru',
          url: '/duyuru',
        },
        {
          id:  12,
          title: 'Şikayet Şablon',
          icon: 'recycle',
          key: 'sikayetSablon',
          url: '/sikayetSablon',
        },
        {
          id:  13,
          title: 'Şikayet Değerlendirme',
          icon: 'recycle',
          key: 'sikayetDegerlendirme',
          url: '/sikayetDegerlendirme',
        },
        {
          id:  14,
          title: 'Banka Kullanıcı',
          icon: 'recycle',
          key: 'bankaKullanici',
          url: '/bankaKullanici',
        },
      ],
    },
  ],
};

export default menu;
