import fs from 'fs';
import process from 'process';
import path from 'path';

export enum LocaleName { en = 'en' };
export type LangPacks = { [key: string]: { [key: string]: any } }
export const supportLocales = [ LocaleName.en ];

const localePath = './public/locales';
const localeExtension = 'json';

export const serverSideLangPacks: LangPacks = {};
export const allNameSpacesSet: Set<string> = new Set<string>();
export const allNameSpacesArr: string[] = [];
const getLocaleNamespaces = (path: string) => fs.readdirSync(path).map((file) => file.replace(`.${localeExtension}`, ''));

supportLocales.forEach((locale: any) => {
  if (!process.cwd) {
    return;
  }

  const p = path.resolve(process.cwd(), `${localePath}/${locale}`);
  const namespace = getLocaleNamespaces(p);

  if (!serverSideLangPacks[locale]) {
    serverSideLangPacks[locale] = {};
  }

  for (const ns of namespace) {
    allNameSpacesSet.add(ns);
    const data = fs.readFileSync(path.resolve(p, `${ns}.json`), 'utf-8');

    serverSideLangPacks[locale][ns] = JSON.parse(data);
  }
});

allNameSpacesSet.forEach((x) => {
  allNameSpacesArr.push(x);
});