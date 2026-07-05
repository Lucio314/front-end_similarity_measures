import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="text-center mb-4" style={{ position: 'relative' }}>
      <button
        onClick={toggleLang}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          background: 'none',
          border: '1px solid #9c86ec',
          borderRadius: 6,
          padding: '2px 10px',
          fontSize: 13,
          color: '#4f46e5',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        {i18n.language === 'en' ? 'FR' : 'EN'}
      </button>
      <h1 className="fw-bold fs-3 mb-1">{t('header.title')}</h1>
      <p className="text-muted mb-0">{t('header.subtitle')}</p>
    </div>
  );
}

export default Header;
