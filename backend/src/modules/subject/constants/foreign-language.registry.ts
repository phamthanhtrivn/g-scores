import { ForeignLanguageCode } from '../enums/foreign-language-code.enum';

export const FOREIGN_LANGUAGE_REGISTRY: Record<string, string> = {
  [ForeignLanguageCode.N1]: 'Tiếng Anh',
  [ForeignLanguageCode.N2]: 'Tiếng Nga',
  [ForeignLanguageCode.N3]: 'Tiếng Pháp',
  [ForeignLanguageCode.N4]: 'Tiếng Trung Quốc',
  [ForeignLanguageCode.N5]: 'Tiếng Đức',
  [ForeignLanguageCode.N6]: 'Tiếng Nhật',
  [ForeignLanguageCode.N7]: 'Tiếng Hàn Quốc',
};
