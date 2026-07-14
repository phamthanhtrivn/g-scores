import { ForeignLanguageCode } from '../enums/foreign-language-code.enum';

export const FOREIGN_LANGUAGE_REGISTRY: Record<string, string> = {
  [ForeignLanguageCode.N1]: 'English',
  [ForeignLanguageCode.N2]: 'Russian',
  [ForeignLanguageCode.N3]: 'French',
  [ForeignLanguageCode.N4]: 'Chinese',
  [ForeignLanguageCode.N5]: 'German',
  [ForeignLanguageCode.N6]: 'Japanese',
  [ForeignLanguageCode.N7]: 'Korean',
};
