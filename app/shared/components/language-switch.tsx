import { Globe } from 'lucide-react';

import { BrasilFlag, EuaFlag, GerFlag } from '@/shared/assets';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/components/ui/select';
import { useI18n } from '@/shared/hooks/use-i18n';

export const LanguageSwitch = () => {
  const { language, onChangeLanguage } = useI18n();

  return (
    <Select
      value={language}
      onValueChange={(value) => onChangeLanguage(value as 'pt' | 'en')}
    >
      <SelectTrigger
        className="flex w-12 items-center justify-center border-none"
        iconColor="white"
      >
        <Globe className="h-6 w-6" color="white" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt">
          <div className="flex items-center gap-2">
            <img
              src={BrasilFlag}
              alt="Portuguese"
              className="h-5 w-5 rounded-sm"
            />
            Português
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <img src={EuaFlag} alt="English" className="h-5 w-5 rounded-sm" />
            English
          </div>
        </SelectItem>
        <SelectItem value="de">
          <div className="flex items-center gap-2">
            <img src={GerFlag} alt="German" className="h-5 w-5 rounded-sm" />
            Deutsch
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
