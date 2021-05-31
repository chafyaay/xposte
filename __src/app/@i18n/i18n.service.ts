import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import en from './translation/messages.en.json';
import fr from './translation/messages.fr.json';

import supportedLangs from './translation/lang.json';

@Injectable({ providedIn: 'root' })
export class I18nService {
  defaultLanguage!: string;
  supportedLanguages!: string[];
  private langChangeSubscription!: Subscription;

  constructor(private translateService: TranslateService) {
    // Embed languages to avoid extra HTTP requests
    translateService.setTranslation('en', en);
    translateService.setTranslation('fr', fr);


  }

  getSupportedLangs() {
    return supportedLangs;
  }

  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = '';
  }

  destroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  set language(language: string) {
    language = language || this.translateService.getBrowserCultureLang();
    let isSupportedLanguage = this.supportedLanguages.includes(language);
    if (language && !isSupportedLanguage) {
      language = language.split('-')[0];
      language =
        this.supportedLanguages.find((supportedLanguage) =>
          supportedLanguage.startsWith(language)
        ) || '';
      isSupportedLanguage = Boolean(language);
    }
    if (!isSupportedLanguage) {
      language = this.defaultLanguage;
    }
    // log.debug(`Language set to ${​​​​​language}​​​​​`);
    this.translateService.use(language);
  }

  get language(): string {
    return this.translateService.currentLang;
  }
}
