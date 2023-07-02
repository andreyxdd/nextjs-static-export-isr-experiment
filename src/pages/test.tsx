import { GetStaticProps } from 'next';
import styles from '@/styles/Home.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Test() {
  const { t } = useTranslation('common')

  return (
    <main className={`${styles.main}`}>
      <div>
        <h3>Here is your translation</h3>
        <p>{t('test-content')}</p>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const result = await serverSideTranslations(locale as string, ['common']);
  return {
    props: { ...result }
  };
}
