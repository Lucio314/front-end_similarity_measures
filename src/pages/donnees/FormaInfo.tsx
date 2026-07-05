import { useTranslation } from 'react-i18next';

function FormatInfo() {
  const { t } = useTranslation();
  return (
    <div className="mt-4 p-3 rounded border bg-light" style={{ fontSize: 13 }}>
      <p className="mb-1">
        <strong>{t('data.format.label')}</strong> {t('data.format.desc', { components: [<code key="0">;</code>] })}
        {' '}<code>pcode;space;start;end;activity;mode</code>
      </p>
      <p className="mb-1 text-muted" style={{ fontFamily: 'monospace', fontSize: 12 }}>
        110100000101,00;*;840;859;moving;walk
      </p>
      <p className="mb-0 text-muted" style={{ fontSize: 12 }}>
        <strong>start</strong> {t('language') === 'fr' ? 'et' : 'and'} <strong>end</strong>
        {' '}{t('data.format.note')}
      </p>
    </div>
  );
}

export default FormatInfo;
