import styles from '@/styles/Home.module.css';
import { useTranslation } from 'next-i18next';
import { allNameSpacesArr } from '@/utils/lang';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';

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

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };