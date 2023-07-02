import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../../next-i18next.config';

export const getI18nPaths = () => i18nextConfig.i18n.locales.map((lng) => ({
  params: { locale: lng },
}));

export const getStaticPaths = () => ({
    fallback: false,
    paths: getI18nPaths(),
});

export const getI18nProps = async (ctx: any, ns = ['common']) => {
    const locale = ctx?.params?.locale || i18nextConfig.i18n.defaultLocale;
    const props = {
        ...(await serverSideTranslations(locale, ns)),
    };
    return props;
};

export const makeStaticProps = (allNameSpacesArr: string[] = []) => async (ctx: any) => {
  return {
    props: { ...(await getI18nProps(ctx, allNameSpacesArr)) }, 
  };
};